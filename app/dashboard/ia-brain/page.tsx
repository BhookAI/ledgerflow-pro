"use client"

import { useState } from "react"

import { motion } from "framer-motion"
import { BrainCircuit, Search, ShieldAlert, Sparkles, Mic, CloudRain, AlertTriangle, FileVideo, Download, Image as ImageIcon, Send, Clock, Play, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function IABrainPage() {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSend = async () => {
        if (!input.trim() || isLoading) return
        const userMsg = input.trim()
        setMessages(prev => [...prev, { role: 'user', content: userMsg }])
        setInput('')
        setIsLoading(true)

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            })

            const data = await res.json()

            if (!res.ok) throw new Error(data.error || 'Error al conectar con la IA')

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.reply || 'Sin respuesta.'
            }])
        } catch (error: any) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Error del sistema: ${error.message}`
            }])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400 font-[var(--font-space-mono)] tracking-tight">AI Brain Central</h1>
                    <p className="text-[var(--text-secondary)] mt-1">Herramientas de inteligencia artificial unificadas.</p>
                </div>
                <div className="px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                    Sistemas en línea
                </div>
            </div>

            <Tabs defaultValue="chat" className="w-full">
                <TabsList className="grid grid-cols-2 lg:grid-cols-5 h-auto gap-4 bg-transparent p-0 mb-8">
                    <TabsTrigger value="chat" className="p-0 border-0 bg-transparent data-[state=active]:ring-2 data-[state=active]:ring-violet-500 rounded-xl overflow-hidden h-full">
                        <Card className="p-5 bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer group relative overflow-hidden text-left h-full w-full">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all" />
                            <div className="p-3 rounded-xl w-fit bg-violet-500/20 text-violet-400 mb-4">
                                <BrainCircuit className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Chat Central</h3>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-2">Asistente principal de datos</p>
                        </Card>
                    </TabsTrigger>

                    {[
                        { id: "search", title: "Búsqueda Semántica", icon: Search, color: "text-blue-400", bg: "bg-blue-500/20", desc: "Encuentra datos en documentos antiguos" },
                        { id: "risk", title: "Analista de Riesgos", icon: ShieldAlert, color: "text-rose-400", bg: "bg-rose-500/20", desc: "Detección de pérdidas en tiempo real" },
                        { id: "prompt", title: "Prompt Renders", icon: Sparkles, color: "text-amber-400", bg: "bg-amber-500/20", desc: "Generador de Prompts para Midjourney" },
                        { id: "meetings", title: "Resumen Reuniones", icon: Mic, color: "text-emerald-400", bg: "bg-emerald-500/20", desc: "Transcribe y extrae acuerdos" },
                    ].map((tool) => (
                        <TabsTrigger key={tool.id} value={tool.id} className="p-0 border-0 bg-transparent data-[state=active]:ring-2 data-[state=active]:ring-violet-500 rounded-xl overflow-hidden h-full">
                            <Card className="p-5 bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-all cursor-pointer group relative overflow-hidden text-left h-full w-full">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-all" />
                                <div className={`p-3 rounded-xl w-fit ${tool.bg} ${tool.color} mb-4`}>
                                    <tool.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-1">{tool.title}</h3>
                                <p className="text-xs text-[var(--text-muted)] line-clamp-2">{tool.desc}</p>
                            </Card>
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="chat" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 min-h-[400px] flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-transparent" />
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/5">
                            <BrainCircuit className="h-6 w-6 text-violet-400" />
                            <h2 className="text-xl font-bold text-white">Chat Contextual Interactivo</h2>
                        </div>

                        <div className="flex-1 flex flex-col p-8 overflow-y-auto w-full max-w-4xl mx-auto space-y-4">
                            {messages.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4 ring-4 ring-violet-500/5">
                                        <Sparkles className="h-8 w-8 text-violet-400" />
                                    </div>
                                    <h3 className="text-white font-medium mb-2">¿En qué te puedo ayudar hoy?</h3>
                                    <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto mb-8">
                                        Pregúntame sobre materiales de proyectos anteriores, píde que resuma un contrato o que analice el flujo de caja del próximo trimestre.
                                    </p>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={i} className={`flex items-start gap-3 w-fit max-w-[80%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                                        {msg.role === 'assistant' && (
                                            <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 mt-1">
                                                <BrainCircuit className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div className={`p-4 rounded-xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-violet-600 text-white' : 'bg-white/5 text-white/90 border border-white/10'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                ))
                            )}

                            {isLoading && (
                                <div className="flex items-start gap-3 w-fit mr-auto">
                                    <div className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 mt-1">
                                        <BrainCircuit className="h-4 w-4 animate-pulse" />
                                    </div>
                                    <div className="p-4 rounded-xl text-sm bg-white/5 text-[var(--text-muted)] border border-white/10 animate-pulse">
                                        Procesando con IA...
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="w-full max-w-3xl mx-auto relative group mt-auto px-4 pb-4">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ej: ¿Qué materiales usé en el proyecto de Jacó el año pasado?"
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all shadow-xl shadow-black/20"
                            />
                            <button onClick={handleSend} disabled={isLoading} className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-violet-600 rounded-xl text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-500/25 disabled:opacity-50">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="search" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 min-h-[500px]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Search className="h-5 w-5 text-blue-400" /> Motor de Búsqueda Semántica
                        </h2>
                        <div className="w-full max-w-3xl mb-8 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-muted)]" />
                            <input type="text" placeholder="Buscar 'Facturas de acero trimestre pasado' o 'Planos eléctricos Alfa'"
                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-blue-500/50 outline-none" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">Sugerencias AI</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-blue-500/30 cursor-pointer">
                                    <h5 className="text-white font-medium text-sm">Contratos firmados este mes</h5>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">Busca en todos los repositorios OCR</p>
                                </div>
                                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-blue-500/30 cursor-pointer">
                                    <h5 className="text-white font-medium text-sm">Comparativa proveedor Cemento</h5>
                                    <p className="text-xs text-[var(--text-muted)] mt-1">Analiza 12 meses de facturación</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="risk" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <Card className="col-span-2 p-6 bg-[var(--bg-secondary)] border-white/5">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                <ShieldAlert className="h-5 w-5 text-rose-400" /> Analista de Riesgos Predictivo
                            </h2>
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 h-full w-1 border-r-4 border-rose-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                                            <AlertTriangle className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-rose-400 font-bold mb-1">Riesgo de Atraso Crítico: Proyecto Gamma</h4>
                                            <p className="text-sm text-white/80">
                                                La combinación de pronóstico de lluvias fuertes (90%) para el jueves y el retraso actual en curado de lozas puede causar un delay de 4 días en la ruta crítica.
                                            </p>
                                            <div className="mt-4 flex gap-2">
                                                <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white border-0 text-xs">Ajustar Gantt y Notificar</Button>
                                                <Button size="sm" variant="outline" className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10 text-xs">Ignorar</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 relative overflow-hidden">
                                    <div className="absolute right-0 top-0 h-full w-1 border-r-4 border-amber-500" />
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
                                            <TrendingDown className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-amber-400 font-bold mb-1">Fluctuación Material: Acero</h4>
                                            <p className="text-sm text-white/80">
                                                El costo del acero corrugado ha subido un 8% internacionalmente. Tienes 3 presupuestos pendientes de aprobación que podrían perder margen.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
                            <h3 className="font-bold text-white mb-4">Fuentes Conectadas</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <CloudRain className="h-4 w-4 text-blue-400" />
                                        <span className="text-sm text-white">API Clima Activa</span>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 text-[10px] border-0">ONLINE</Badge>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <TrendingDown className="h-4 w-4 text-amber-400" />
                                        <span className="text-sm text-white">Mercado Commodities</span>
                                    </div>
                                    <Badge className="bg-emerald-500/10 text-emerald-400 text-[10px] border-0">ONLINE</Badge>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between text-xs mb-2"><span>Salud Gral. Portafolio</span><span className="text-emerald-400">Excelente (92%)</span></div>
                                <Progress value={92} className="h-2 bg-white/10 [&>div]:bg-emerald-500" />
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="prompt" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-amber-400" /> Generador de Prompts (Midjourney)
                            </h2>
                            <p className="text-sm text-[var(--text-muted)] mb-6">Describe tu idea vagamente y la IA generará el prompt perfecto para Renders hiperrealistas.</p>

                            <textarea
                                className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-amber-500/50 outline-none resize-none"
                                placeholder="Ej: Casa en la playa, estilo moderno con mucha madera, piscina infinita al atardecer..."
                            ></textarea>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="outline" className="cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/30 text-[var(--text-muted)]">Hyper-realism</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/30 text-[var(--text-muted)]">Unreal Engine 5</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/30 text-[var(--text-muted)]">Golden Hour</Badge>
                                <Badge variant="outline" className="cursor-pointer hover:bg-amber-500/10 hover:border-amber-500/30 bg-amber-500/10 text-amber-500 border-amber-500/30">ArchViz</Badge>
                            </div>

                            <Button className="w-full mt-6 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/20">
                                Generar Prompt Maestro
                            </Button>
                        </Card>

                        <Card className="p-6 bg-[var(--bg-primary)] border-white/5 relative flex flex-col items-center justify-center min-h-[400px]">
                            <ImageIcon className="h-16 w-16 text-white/5 absolute" />
                            <div className="z-10 bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl w-full max-w-sm">
                                <h4 className="text-amber-400 text-xs font-mono font-bold uppercase mb-2">Prompt Generado</h4>
                                <p className="text-sm text-white/90 font-mono leading-relaxed select-all">
                                    /imagine prompt: Architectural photography of a modern luxury beach house, extensive use of warm teak wood, infinite edge pool reflecting a vibrant golden hour sunset, hyper-realistic, photorealistic, Unreal Engine 5 render, ray tracing, 8k resolution, highly detailed, cinematic lighting --ar 16:9 --v 6.0
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <Button size="sm" variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white text-xs">Copiar al Portapapeles</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="meetings" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 min-h-[500px]">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Mic className="h-5 w-5 text-emerald-400" /> Centro de Reuniones & Actas
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="border-2 border-dashed border-white/10 hover:border-emerald-500/30 rounded-2xl p-12 text-center group transition-colors cursor-pointer bg-white/[0.01]">
                                    <div className="p-4 bg-emerald-500/10 w-fit mx-auto rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <FileVideo className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <h3 className="font-bold text-white text-lg">Subir Grabación</h3>
                                    <p className="text-xs text-[var(--text-muted)] mt-2">Sube MP3, MP4, WAV. La IA transcribirá e identificará a los hablantes.</p>
                                    <Button size="sm" className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white">Seleccionar Archivo</Button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-white text-sm uppercase tracking-widest text-[var(--text-muted)]">Historial Reciente</h3>

                                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex gap-4">
                                    <div className="p-3 bg-indigo-500/10 rounded-lg h-fit">
                                        <Clock className="h-5 w-5 text-indigo-400" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-white text-sm">Presentación Diseño Conceptual</h4>
                                        <p className="text-xs text-[var(--text-muted)] mt-1">Familia Rojas • Ayer 14:00 • 45 min</p>
                                        <div className="mt-3 flex gap-2">
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-0 text-[10px]">Acuerdos Extraídos</Badge>
                                            <Badge variant="outline" className="bg-indigo-500/10 text-indigo-400 border-0 text-[10px]">Resumen Listo</Badge>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center pt-3 border-t border-white/5">
                                            <Button variant="ghost" size="sm" className="h-8 text-xs text-white hover:bg-white/5 px-2"><Play className="h-3 w-3 mr-1" /> Escuchar</Button>
                                            <Button variant="ghost" size="sm" className="h-8 text-xs text-[var(--text-secondary)] hover:bg-white/5 px-2"><Download className="h-3 w-3 mr-1" /> PDF</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
