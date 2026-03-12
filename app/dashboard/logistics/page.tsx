"use client"

import { useState } from 'react'

import { motion } from "framer-motion"
import { Truck, Package, Tag, AlertCircle, FileText, TrendingUp, TrendingDown, ShoppingCart, Plus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

export default function LogisticsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white font-[var(--font-space-mono)] tracking-tight">Logística y Proveedores</h1>
                <p className="text-[var(--text-secondary)] mt-1">Directorio, cotizaciones y control de inventario.</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
                <span className="text-amber-400 font-bold">⚠ Vista Previa</span> — Los datos mostrados son de demostración. Este módulo estará conectado a datos reales próximamente.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-6 bg-white/[0.02] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400">
                            <Truck className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Proveedores Activos</p>
                            <h3 className="text-2xl font-bold text-white">24</h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white/[0.02] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Órdenes Pendientes</p>
                            <h3 className="text-2xl font-bold text-white">7</h3>
                        </div>
                    </div>
                </Card>

                <Card className="p-6 bg-white/[0.02] border-white/5 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-rose-500/20 text-rose-400">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-[var(--text-muted)]">Alertas de Stock</p>
                            <h3 className="text-2xl font-bold text-white">3</h3>
                        </div>
                    </div>
                </Card>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="bg-[var(--bg-secondary)] border border-white/10 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar flex w-full sm:w-auto">
                    <TabsTrigger value="overview" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
                        <Tag className="h-4 w-4" /> Resumen & Compras
                    </TabsTrigger>
                    <TabsTrigger value="inventory" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
                        <Package className="h-4 w-4" /> Inventario & Sobrantes
                    </TabsTrigger>
                    <TabsTrigger value="alerts" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
                        <AlertCircle className="h-4 w-4" /> Alertas de Precio
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Directorio de Proveedores</h2>
                                <Button size="sm" onClick={() => toast.success('Añadiendo nuevo proveedor...')} className="bg-indigo-600 hover:bg-indigo-700 h-8 text-xs">
                                    <Plus className="h-3 w-3 mr-1" /> Nuevo Proveedor
                                </Button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <Truck className="h-5 w-5 text-white/70" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">Proveedor Alfa</h4>
                                                <p className="text-xs text-[var(--text-muted)]">Materiales Estructurales</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="flex text-yellow-400 text-sm">★★★★<span className="text-white/20">★</span></div>
                                            <span className="text-[10px] text-emerald-400">95% Puntualidad</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 relative overflow-hidden group">
                                <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                                <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-indigo-400" /> Generador Órdenes de Compra
                                </h2>
                                <p className="text-sm text-[var(--text-muted)] mb-4">La IA genera el documento legal vinculante en 1 clic basado en la cotización ganadora.</p>
                                <button onClick={() => toast.success('Orden de compra generada enviada a Proveedor Alfa')} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-500/20 font-medium">
                                    Generar Orden a Proveedor Alfa
                                </button>
                            </Card>

                            <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <Tag className="h-5 w-5 text-indigo-400" /> Comparador IA (Proformas)
                                </h2>
                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-white/10 rounded-xl bg-white/[0.01]">
                                    <ShoppingCart className="h-8 w-8 text-white/40 mb-3" />
                                    <p className="text-white/60 text-sm text-center">Sube hasta 3 proformas. La IA destacará la de mejor precio/crédito.</p>
                                    <button onClick={() => toast.info('Sube archivos PDF para analizar cotizaciones (Próximamente)')} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm transition-colors">
                                        Analizar Cotizaciones
                                    </button>
                                </div>
                            </Card>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="inventory" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Inventario (Sobrantes Reutilizables)</h2>
                            <div className="flex items-center gap-4">
                                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-lg font-mono">
                                    Ahorro Potencial: $1,250
                                </span>
                                <Button size="sm" onClick={() => toast.success('Añadiendo material sobrante...')} className="bg-indigo-600 hover:bg-indigo-700 h-8 text-xs">
                                    <Plus className="h-3 w-3 mr-1" /> Añadir Material
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="grid grid-cols-4 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider pb-2 border-b border-white/10 px-4">
                                <div className="col-span-2">Material</div>
                                <div>Origen</div>
                                <div className="text-right">Cantidad</div>
                            </div>
                            {[
                                { mat: 'Cerámica Blanca 60x60', orig: 'Proyecto Jacó', qty: '12 cajas', type: 'Acabados' },
                                { mat: 'Pintura Acrílica Blanco Hueso', orig: 'Torre Empresarial', qty: '3 cubetas', type: 'Pinturas' },
                                { mat: 'Tubos PVC 4" DWV', orig: 'Casa Escazú', qty: '8 uds', type: 'Plomería' },
                            ].map((inv, i) => (
                                <div key={i} className="grid grid-cols-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 items-center">
                                    <div className="col-span-2">
                                        <h4 className="text-white font-medium text-sm">{inv.mat}</h4>
                                        <p className="text-xs text-[var(--text-muted)]">{inv.type}</p>
                                    </div>
                                    <div className="text-xs text-[var(--text-secondary)]">{inv.orig}</div>
                                    <div className="text-right font-bold text-indigo-300 font-mono">{inv.qty}</div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </TabsContent>

                <TabsContent value="alerts" className="mt-0">
                    <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
                        <h2 className="text-xl font-bold text-white mb-6">Rastreo de Fluctuaciones (Mercado Global - USD)</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/5 -z-10" />

                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-rose-500/20 shadow-[0_0_15px_rgba(244,63,94,0.05)] text-center">
                                <h3 className="text-[var(--text-secondary)] font-medium mb-2">Acero Estructural (Ton)</h3>
                                <div className="text-3xl font-bold text-white font-mono mb-2">$850.00</div>
                                <div className="inline-flex items-center gap-1 text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg">
                                    <TrendingUp className="h-3 w-3" /> +4.2% (30d)
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] text-center">
                                <h3 className="text-[var(--text-secondary)] font-medium mb-2">Cemento Portland (Saco)</h3>
                                <div className="text-3xl font-bold text-white font-mono mb-2">$9.50</div>
                                <div className="inline-flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg">
                                    <TrendingDown className="h-3 w-3" /> -1.5% (30d)
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                                <h3 className="text-[var(--text-secondary)] font-medium mb-2">Madera Pino Tratada (FT)</h3>
                                <div className="text-3xl font-bold text-white font-mono mb-2">$2.25</div>
                                <div className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)] bg-white/5 px-2 py-1 rounded-lg">
                                    Estable
                                </div>
                            </div>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
