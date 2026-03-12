import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServiceSupabaseClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'arcee-ai/trinity-large-preview:free'

async function getContext(supabase: any, tenantId: string) {
    const [
        { data: clients },
        { data: projects },
        { data: transactions },
        { data: documents },
    ] = await Promise.all([
        supabase.from('clients').select('full_name, email, is_active, access_code').eq('tenant_id', tenantId).limit(20),
        supabase.from('projects').select('title, status, budget, progress, description').eq('tenant_id', tenantId).limit(20),
        supabase.from('transactions').select('description, amount, type, date, category').eq('tenant_id', tenantId).order('date', { ascending: false }).limit(30),
        supabase.from('documents').select('file_name, document_type, status, created_at').eq('tenant_id', tenantId).limit(20),
    ])

    const totalIncome = (transactions ?? []).filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0)
    const totalExpenses = (transactions ?? []).filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0)

    return `
=== CONTEXTO DEL NEGOCIO ===

CLIENTES (${clients?.length ?? 0} total):
${(clients ?? []).map((c: any) => `- ${c.full_name} (${c.email || 'sin email'}) — ${c.is_active ? 'activo' : 'inactivo'}, código: ${c.access_code}`).join('\n') || 'Sin clientes'}

PROYECTOS (${projects?.length ?? 0} total):
${(projects ?? []).map((p: any) => `- "${p.title}" — Estado: ${p.status}, Progreso: ${p.progress ?? 0}%, Presupuesto: €${p.budget || 0}`).join('\n') || 'Sin proyectos'}

FINANZAS (últimas 30 transacciones):
- Total ingresos: €${totalIncome.toLocaleString('es-ES')}
- Total gastos: €${totalExpenses.toLocaleString('es-ES')}
- Balance: €${(totalIncome - totalExpenses).toLocaleString('es-ES')}
${(transactions ?? []).map((t: any) => `- ${t.date}: ${t.type === 'income' ? '+' : '-'}€${t.amount} — ${t.description} (${t.category || 'General'})`).join('\n') || 'Sin transacciones'}

DOCUMENTOS (${documents?.length ?? 0} total):
${(documents ?? []).map((d: any) => `- ${d.file_name} — Tipo: ${d.document_type || 'desconocido'}, Estado: ${d.status}`).join('\n') || 'Sin documentos'}
`.trim()
}

export async function POST(request: Request) {
    try {
        if (!OPENROUTER_API_KEY) {
            return NextResponse.json(
                { error: 'El agente IA no está configurado. Añade OPENROUTER_API_KEY en .env.local' },
                { status: 503 }
            )
        }

        const cookieStore = cookies()
        const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })
        const { data: { session } } = await supabaseAuth.auth.getSession()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

        const supabase = createServiceSupabaseClient()

        // Intentar obtener el tenantId desde múltiples fuentes
        let tenantId: string | null = null

        // 1. Desde tabla 'users'
        const { data: userRow } = await supabase
            .from('users')
            .select('tenant_id')
            .eq('id', session.user.id)
            .maybeSingle()
        if (userRow?.tenant_id) tenantId = userRow.tenant_id

        // 2. Desde tabla 'profiles'
        if (!tenantId) {
            const { data: profileRow } = await supabase
                .from('profiles')
                .select('tenant_id')
                .eq('id', session.user.id)
                .maybeSingle()
            if (profileRow?.tenant_id) tenantId = profileRow.tenant_id
        }

        // 3. Desde user_metadata de la sesión
        if (!tenantId) {
            tenantId = session.user.user_metadata?.tenant_id ?? null
        }

        // 4. Último recurso: usar el user.id como tenant (para instancias single-tenant)
        if (!tenantId) {
            tenantId = session.user.id
        }

        console.log('[Agent] tenantId resuelto:', tenantId)

        const body = await request.json()
        const { messages } = body // array de { role: 'user'|'assistant', content: string }

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: 'Mensajes requeridos' }, { status: 400 })
        }

        // Obtener contexto de negocio
        let businessContext = ''
        try {
            businessContext = await getContext(supabase, tenantId)
        } catch (e) {
            console.warn('Could not get business context:', e)
        }

        const systemPrompt = `Eres el asistente IA de LedgerFlow, una plataforma de gestión empresarial.
Ayudas al usuario con análisis financiero, gestión de clientes, proyectos y documentos.
Responde siempre en español, de forma clara, precisa y profesional.
Cuando el usuario pregunte sobre sus datos, usa el contexto proporcionado para dar respuestas específicas.
Si no tienes suficiente información, dilo claramente.

${businessContext ? `DATOS ACTUALES DEL NEGOCIO:\n${businessContext}` : 'No hay datos disponibles aún en el sistema.'}

Fecha actual: ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`

        // OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ledgerflow.app',
                'X-Title': 'LedgerFlow AI Agent',
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages.map((m: any) => ({ role: m.role, content: m.content })),
                ],
                max_tokens: 1024,
                temperature: 0.7,
            }),
        })

        if (!response.ok) {
            const err = await response.text()
            console.error('OpenRouter API error:', response.status, err)
            return NextResponse.json(
                { error: `Error comunicando con OpenRouter (Status ${response.status}): ${err.substring(0, 200)}` },
                { status: 502 }
            )
        }

        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content ?? 'No se recibió respuesta.'

        return NextResponse.json({ reply })
    } catch (error) {
        console.error('Error in agent route:', error)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}
