"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
    FileImage, Calculator, Camera, History, ArrowLeft,
    Map, Sparkles, Mic, Upload, Layers
} from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ProjectDetail() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/projects" className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-white">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-bold text-white font-[var(--font-space-mono)] tracking-tight">Torre Empresarial Alpha</h1>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">En Ejecución</Badge>
                    </div>
                    <p className="text-[var(--text-secondary)] mt-1">Av. Escazú, Costa Rica • Finalización Est.: Nov 2026</p>
                </div>
            </div>

            <Tabs defaultValue="blueprints" className="w-full space-y-6">
                <TabsList className="bg-[var(--bg-secondary)] border border-white/10 p-1 rounded-xl w-full justify-start overflow-x-auto hide-scrollbar">
                    <TabsTrigger value="blueprints" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                        <Map className="h-4 w-4" /> Visor de Planos
                    </TabsTrigger>
                    <TabsTrigger value="materials" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                        <Calculator className="h-4 w-4" /> Cubicación IA
                    </TabsTrigger>
                    <TabsTrigger value="logs" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                        <Camera className="h-4 w-4" /> Bitácora de Campo
                    </TabsTrigger>
                    <TabsTrigger value="versions" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                        <History className="h-4 w-4" /> Control de Versiones
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="blueprints" className="mt-0">
                    <Card className="glass-card p-0 overflow-hidden border-white/10 relative h-[600px] flex flex-col">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div className="flex items-center gap-2">
                                <FileImage className="h-5 w-5 text-indigo-400" />
                                <h3 className="text-white font-medium">Plano_Estructural_V2.pdf</h3>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs rounded-lg transition-colors">Añadir Nota</button>
                                <button className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition-colors">Aprobar Plano</button>
                            </div>
                        </div>
                        <div className="flex-1 bg-black/40 relative flex items-center justify-center p-8 overflow-hidden group">
                            <div className="absolute inset-x-0 inset-y-0 opacity-20 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                            {/* Mock Blueprint Image Context */}
                            <div className="relative w-full max-w-3xl aspect-[4/3] bg-indigo-900/20 border border-indigo-500/30 rounded-lg shadow-2xl flex items-center justify-center">
                                <Map className="h-32 w-32 text-indigo-500/20" />

                                {/* Mock Annotation */}
                                <div className="absolute top-[30%] left-[40%] text-left">
                                    <div className="w-4 h-4 rounded-full border-2 border-rose-500 bg-rose-500/20 animate-ping absolute -left-2 -top-2" />
                                    <div className="w-2 h-2 rounded-full bg-rose-500 relative z-10" />
                                    <div className="mt-2 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-lg w-48 shadow-xl">
                                        <p className="text-xs text-white font-medium">Revisar viga reforzada</p>
                                        <p className="text-[10px] text-[var(--text-muted)] mt-1">Ing. Carlos - Hace 2h</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="materials" className="mt-0 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 flex flex-col items-center justify-center text-center border-dashed border-2 min-h-[300px]">
                            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                                <Upload className="h-8 w-8 text-indigo-400" />
                            </div>
                            <h3 className="text-white font-medium mb-2">Sube tu lista de materiales o plano BIM</h3>
                            <p className="text-[var(--text-muted)] text-sm mb-6 max-w-xs">La IA analizará el documento y extraerá la volumetría y piezas necesarias automáticamente.</p>
                            <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">Seleccionar Archivo</button>
                        </Card>

                        <Card className="p-0 bg-[var(--bg-secondary)] border-white/5 overflow-hidden flex flex-col">
                            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-indigo-500/10 to-transparent flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-indigo-400" />
                                <h3 className="text-white font-bold">Análisis IA de Cubicación</h3>
                            </div>
                            <div className="flex-1 p-0">
                                <table className="w-full text-sm text-left text-[var(--text-secondary)]">
                                    <thead className="text-xs text-white uppercase bg-white/5 border-b border-white/10">
                                        <tr>
                                            <th className="px-4 py-3">Material</th>
                                            <th className="px-4 py-3 text-right">Cantidad Sugerida</th>
                                            <th className="px-4 py-3 text-right">Confianza IA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <td className="px-4 py-3 font-medium text-white">Cemento Portland Sec. 3</td>
                                            <td className="px-4 py-3 text-right">145 sacos</td>
                                            <td className="px-4 py-3 text-right"><span className="text-emerald-400">98%</span></td>
                                        </tr>
                                        <tr className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <td className="px-4 py-3 font-medium text-white">Varilla Corrugada 1/2"</td>
                                            <td className="px-4 py-3 text-right">320 varillas</td>
                                            <td className="px-4 py-3 text-right"><span className="text-emerald-400">95%</span></td>
                                        </tr>
                                        <tr className="hover:bg-white/[0.02]">
                                            <td className="px-4 py-3 font-medium text-white">Block Concreto 12x12x24</td>
                                            <td className="px-4 py-3 text-right">2,400 unids</td>
                                            <td className="px-4 py-3 text-right"><span className="text-amber-400">82%</span> (Revisar planos)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="logs" className="mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-4">
                            {[1, 2].map((i) => (
                                <Card key={i} className="p-5 bg-[var(--bg-secondary)] border-white/5">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">Ing</div>
                                            <div>
                                                <h4 className="text-white font-medium text-sm">Visita Técnica #{3 - i}</h4>
                                                <p className="text-xs text-[var(--text-muted)]">Ayer, 3:45 PM</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">Transcrito por IA</Badge>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                                        "Avance constructivo: se completó el colado de las zapatas Z1 a Z4. Hay un pequeño retraso en la entrega de acero por parte del proveedor pero no afecta la ruta crítica aún. Para la próxima semana debemos preparar el área exterior."
                                    </p>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 flex-shrink-0 cursor-pointer hover:bg-white/10 transition-colors">
                                            <Camera className="h-6 w-6 text-white/40" />
                                            <span className="text-[10px] text-white/50">Foto_1.jpg</span>
                                        </div>
                                        <div className="w-24 h-24 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-1 flex-shrink-0 cursor-pointer hover:bg-white/10 transition-colors">
                                            <Camera className="h-6 w-6 text-white/40" />
                                            <span className="text-[10px] text-white/50">Foto_2.jpg</span>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <div className="space-y-4">
                            <Button className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 h-12">
                                <Mic className="h-5 w-5" /> Nueva Nota de Voz
                            </Button>
                            <Button variant="outline" className="w-full gap-2 border-white/10 text-white hover:bg-white/5 h-12">
                                <Camera className="h-5 w-5" /> Subir Fotos
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="versions" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Layers className="h-5 w-5 text-indigo-400" /> Historial de Requerimientos (Scope)
                        </h2>

                        <div className="space-y-0 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active mb-8">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-indigo-400 bg-[var(--bg-secondary)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 shadow">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-white">V3: Expansión Deck Exterior</h3>
                                        <Badge variant="outline" className="text-[10px] text-indigo-300 bg-indigo-500/10 border-indigo-500/20">ACTUAL</Badge>
                                    </div>
                                    <time className="text-xs text-[var(--text-muted)] italic">Aprobado ayer por el cliente</time>
                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">Cliente solicitó agregar 15m2 al deck trasero. Presupuesto ajustado +$4,500.</p>
                                </div>
                            </div>

                            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group mb-8">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-[var(--bg-secondary)] shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                    <h3 className="font-bold text-white mb-1">V2: Cambio Acabados Cocina</h3>
                                    <time className="text-xs text-[var(--text-muted)] italic">Hace 2 semanas</time>
                                    <p className="mt-2 text-sm text-[var(--text-secondary)]">Sustitución de granito por cuarzo blanco. Añadido retraso de 3 días en cronograma.</p>
                                </div>
                            </div>

                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
