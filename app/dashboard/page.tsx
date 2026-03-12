'use client'

import { StatsCards } from '@/components/dashboard/stats-cards'
import { CashFlowChart } from '@/components/dashboard/cash-flow-chart'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { useAuthStore } from '@/lib/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Coffee, Music, HeartPulse, Brain } from 'lucide-react'

import { MiniSphere } from '@/components/ui/cosmic-background'

export default function DashboardPage() {
  const { user } = useAuthStore()
  const firstName = user?.full_name?.split(' ')[0] || 'usuario'

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Buenos días'
    if (hour < 18) return 'Buenas tardes'
    return 'Buenas noches'
  }

  return (
    <div className="space-y-8 relative">
      {/* Floating decorative spheres — monochromatic */}
      <MiniSphere size={50} color="#3A3A3A" className="top-0 right-0 animate-float opacity-20" />
      <MiniSphere size={30} color="#2A2A2A" className="top-32 right-16 animate-float opacity-15" />

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">¡{getGreeting()}, {firstName}! 👋</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Aquí está el resumen de tu negocio.
          </p>
        </div>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Charts and Activity */}
      <div className="grid gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <CashFlowChart />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>

      {/* Focus & Wellbeing Widgets */}
      <div className="grid gap-6 lg:grid-cols-2 mt-8">
        <Card className="glass-card relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-5 w-5 text-violet-400" /> Deep Focus Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-muted)] mb-6">Bloquea notificaciones y activa música ambiental para máxima concentración en tus planos o finanzas.</p>
            <div className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5 shadow-inner">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">25:00</span>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-full h-10 w-10 p-0"><Play className="h-4 w-4 ml-1" /></Button>
                  <Button size="sm" variant="outline" className="border-white/10 text-[var(--text-muted)] rounded-full h-10 w-10 p-0"><Coffee className="h-4 w-4" /></Button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-violet-300 bg-violet-500/10 px-3 py-1.5 rounded-full border border-violet-500/20 cursor-pointer hover:bg-violet-500/20 transition-colors">
                <Music className="h-3 w-3" /> Chill Lofi
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <CardHeader className="pb-2">
            <CardTitle className="text-white flex items-center gap-2">
              <HeartPulse className="h-5 w-5 text-emerald-400" /> Bienestar & Salud Mental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--text-muted)] mb-6">Porque la construcción es estresante. Llevas 4 horas seguidas frente a la pantalla. Es hora de un respiro.</p>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-emerald-400">Alerta de Sobrecarga</h4>
                <p className="text-xs text-white/80 mt-1">El nivel de cortisol técnico está alto. Cierra la pantalla 10 min, toma agua y estira la espalda baja.</p>
              </div>
              <Button variant="outline" className="ml-4 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 flex-shrink-0">
                Marcar Pausa
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
