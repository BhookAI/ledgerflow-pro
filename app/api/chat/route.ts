import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { createServiceSupabaseClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'arcee-ai/trinity-large-preview:free'

async function getSessionAndTenant() {
    const cookieStore = cookies()
    const supabaseAuth = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabaseAuth.auth.getSession()
    if (!session) return { session: null, tenantId: null, supabase: null }

    const supabase = createServiceSupabaseClient()
    const { data: user } = await supabase
        .from('users')
        .select('tenant_id')
        .eq('id', session.user.id)
        .single()

    const tenantId = user?.tenant_id ?? session.user.user_metadata?.tenant_id ?? null
    return { session, tenantId, supabase }
}

export async function POST(request: Request) {
    try {
        if (!OPENROUTER_API_KEY) {
            return NextResponse.json(
                { reply: 'El agente IA no está configurado. Añade OPENROUTER_API_KEY en .env.local' },
                { status: 503 }
            )
        }

        const { session, tenantId, supabase } = await getSessionAndTenant()
        if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        if (!tenantId) {
            return NextResponse.json({ reply: 'Parece que no tienes una empresa o espacio de trabajo configurado aún, por lo que no veo proyectos ni clientes a tu nombre.' })
        }

        const { message } = await request.json()

        // Gather context
        let contextText = ""
        const { data: projects } = await supabase!
            .from('projects')
            .select('*, client:clients(full_name)')
            .eq('tenant_id', tenantId)

        if (projects && projects.length > 0) {
            contextText += "Proyectos:\n" + projects.map((p: any) => `- ${p.title} (${p.status}) - Cliente: ${p.client?.full_name || 'Sin cliente'}`).join('\n') + "\n\n"
        } else {
            contextText += "El usuario no tiene proyectos activos.\n\n"
        }

        const { data: clients } = await supabase!
            .from('clients')
            .select('*')
            .eq('tenant_id', tenantId)

        if (clients && clients.length > 0) {
            contextText += "Clientes:\n" + clients.map((c: any) => `- ${c.full_name} (${c.company_name || 'Sin empresa'})`).join('\n') + "\n\n"
        } else {
            contextText += "El usuario no tiene clientes registrados.\n\n"
        }

        const { data: transactions } = await supabase!
            .from('transactions')
            .select('description, amount, type, date, category')
            .eq('tenant_id', tenantId)
            .order('date', { ascending: false })
            .limit(20)

        if (transactions && transactions.length > 0) {
            const totalIncome = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0)
            const totalExpenses = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0)
            contextText += `Finanzas:\n- Total ingresos: €${totalIncome.toLocaleString('es-ES')}\n- Total gastos: €${totalExpenses.toLocaleString('es-ES')}\n- Balance: €${(totalIncome - totalExpenses).toLocaleString('es-ES')}\n\n`
        }

        // OpenRouter API

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://ledgerflow.app',
                'X-Title': 'LedgerFlow IA Brain',
            },
            body: JSON.stringify({
                model: OPENROUTER_MODEL,
                messages: [
                    {
                        role: 'system',
                        content: `Eres el agente inteligente de LedgerFlowPro. Responde a las consultas del usuario basándote en los siguientes datos de su cuenta:\n\n${contextText}\nResponde de manera concisa y profesional en español.\nFecha actual: ${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                max_tokens: 1024,
                temperature: 0.3
            })
        })

        if (!response.ok) {
            const err = await response.text()
            console.error("OpenRouter API error:", err)
            return NextResponse.json({ reply: `Lo siento, hubo un problema al conectar con OpenRouter (Status ${response.status}). Verifica tu API key.` })
        }

        const data = await response.json()
        const reply = data.choices?.[0]?.message?.content || "No pude generar una respuesta."

        return NextResponse.json({ reply })
    } catch (error) {
        console.error('Error in AI Chat:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
