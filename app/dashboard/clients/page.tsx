'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Mail, Phone, MoreHorizontal, Copy, CheckCircle, BarChart, FileSignature, Presentation, Users, FileText, CheckSquare, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useTranslation } from '@/lib/i18n/use-translation'

interface Client {
  id: string
  full_name: string
  email: string
  phone?: string
  company_name?: string
  access_code: string
  is_active: boolean
  project_count?: number
  last_access?: string
}

export default function ClientsPage() {
  const { t } = useTranslation()
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newClient, setNewClient] = useState({
    full_name: '',
    email: '',
    phone: '',
    company_name: '',
  })

  useEffect(() => {
    fetchClients()
  }, [])

  async function fetchClients() {
    try {
      const res = await fetch('/api/clients')
      if (res.ok) {
        const data = await res.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function copyAccessCode(code: string) {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success(t('clients.copied'))
    setTimeout(() => setCopiedCode(null), 2000)
  }

  async function createClient() {
    if (!newClient.full_name.trim()) {
      toast.error(t('finances.requiredFields'))
      return
    }
    setIsCreating(true)
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      })
      if (res.ok) {
        toast.success(t('clients.addSuccess'))
        setIsDialogOpen(false)
        setNewClient({ full_name: '', email: '', phone: '', company_name: '' })
        fetchClients()
      } else {
        const data = await res.json()
        toast.error(data.error || t('clients.addError'))
      }
    } catch (err) {
      toast.error(t('finances.connectionError'))
    } finally {
      setIsCreating(false)
    }
  }

  const filteredClients = clients.filter(c =>
    c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.company_name?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('clients.title')}</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {t('clients.subtitle')}
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              {t('clients.newClient')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0f111a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>{t('clients.newClient')}</DialogTitle>
              <DialogDescription className="text-[var(--text-muted)]">
                {t('landing.aiDescription')}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('clients.fullName')} *</label>
                <Input
                  placeholder={t('clients.name')}
                  value={newClient.full_name}
                  onChange={(e) => setNewClient({ ...newClient, full_name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('clients.email')}</label>
                <Input
                  type="email"
                  placeholder={t('clients.emailPlaceholder')}
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('clients.phone')}</label>
                <Input
                  placeholder={t('clients.phonePlaceholder')}
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">{t('clients.company')}</label>
                <Input
                  placeholder={t('clients.companyPlaceholder')}
                  value={newClient.company_name}
                  onChange={(e) => setNewClient({ ...newClient, company_name: e.target.value })}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isCreating} className="text-white border-white/10 hover:bg-white/5">
                {t('finances.cancel')}
              </Button>
              <Button onClick={createClient} disabled={isCreating} className="bg-indigo-600 hover:bg-indigo-700">
                {isCreating ? t('finances.saving') : t('clients.newClient')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="bg-[var(--bg-secondary)] border border-white/10 p-1 rounded-xl mb-6 overflow-x-auto hide-scrollbar flex w-full sm:w-auto">
          <TabsTrigger value="directory" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
            <Users className="h-4 w-4" /> Directorio
          </TabsTrigger>
          <TabsTrigger value="pipeline" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
            <BarChart className="h-4 w-4" /> Pipeline Ventas
          </TabsTrigger>
          <TabsTrigger value="contracts" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
            <FileSignature className="h-4 w-4" /> Contratos & Aprobaciones
          </TabsTrigger>
          <TabsTrigger value="portal" className="gap-2 rounded-lg data-[state=active]:bg-indigo-600">
            <Presentation className="h-4 w-4" /> Portal de Cliente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="mt-0">
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input
              placeholder={t('clients.search')}
              className="pl-10 bg-white/5 border-white/10 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Clients Grid */}
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-white/10"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/10 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-1/2"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Users className="h-12 w-12 text-[var(--text-muted)] mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{t('clients.noClients')}</h3>
              <Button onClick={() => setIsDialogOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 mt-4">
                <Plus className="h-4 w-4 mr-2" />
                {t('clients.newClient')}
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <Card key={client.id} className="glass-card hover:border-indigo-500/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border border-white/10">
                          <AvatarFallback className="bg-indigo-500/10 text-indigo-400">
                            {client.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-white">{client.full_name}</h3>
                          {client.company_name && (
                            <p className="text-xs text-[var(--text-secondary)]">
                              {client.company_name}
                            </p>
                          )}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/10">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a1d2e] border-white/10 text-white">
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">{t('common.view')}</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">{t('common.edit')}</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 cursor-pointer">{t('common.delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4 space-y-2">
                      {client.email && (
                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <Mail className="h-3 w-3 text-indigo-400" />
                          {client.email}
                        </div>
                      )}
                      {client.phone && (
                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <Phone className="h-3 w-3 text-indigo-400" />
                          {client.phone}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant={client.is_active ? 'default' : 'secondary'} className={client.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : ''}>
                            {client.is_active ? t('clients.active') : t('clients.inactive')}
                          </Badge>
                          {client.project_count !== undefined && (
                            <span className="text-[10px] text-[var(--text-muted)] font-medium uppercase tracking-wider">
                              {client.project_count} {t('clients.projectsCount')}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => copyAccessCode(client.access_code)}
                          className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10"
                        >
                          {copiedCode === client.access_code ? (
                            <>
                              <CheckCircle className="h-3 w-3" />
                              {t('clients.copied').toUpperCase()}
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              {client.access_code}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pipeline" className="mt-0">
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
            <span className="text-amber-400 font-bold">⚠ Vista Previa</span> — Los datos mostrados son de demostración. Esta funcionalidad estará disponible próximamente.
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar min-h-[500px]">
            {[
              { title: 'Prospectos Nuevos', amount: '$150k', color: 'indigo', leads: 4 },
              { title: 'Primera Reunión', amount: '$85k', color: 'blue', leads: 2 },
              { title: 'Propuesta Enviada', amount: '$420k', color: 'amber', leads: 3 },
              { title: 'Negociación', amount: '$200k', color: 'rose', leads: 1 },
              { title: 'Cerrado/Ganado', amount: '$1.2M', color: 'emerald', leads: 8 }
            ].map((stage) => (
              <div key={stage.title} className="flex-shrink-0 w-80 flex flex-col gap-3">
                <div className={`flex items-center justify-between px-3 py-2 rounded-xl bg-${stage.color}-500/10 border border-${stage.color}-500/20`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${stage.color}-500 shadow-[0_0_8px_rgba(var(--${stage.color}-500),0.8)]`} />
                    <h3 className={`font-bold text-${stage.color}-400 text-sm`}>{stage.title}</h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-white">{stage.amount}</span>
                </div>

                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-3 space-y-3">
                  {Array(stage.leads > 4 ? 2 : stage.leads).fill(0).map((_, i) => (
                    <Card key={i} className="glass-card hover:border-white/20 transition-all cursor-pointer p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-[10px] bg-white/5 text-[var(--text-muted)]">CASA HABITACIÓN</Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/10">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1a1d2e] border-white/10 text-white">
                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Avanzar a Propuesta</DropdownMenuItem>
                            <DropdownMenuItem className="hover:bg-white/5 cursor-pointer">Ver Detalles</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-400/10 cursor-pointer">Marcar Perdido</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">Familia Rojas</h4>
                      <p className="text-xs text-[var(--text-secondary)] flex items-center gap-1 mb-3">
                        <Mail className="h-3 w-3" /> rojas@email.com
                      </p>
                      <div className="flex justify-between items-center text-xs border-t border-white/5 pt-2">
                        <span className="font-mono text-emerald-400 font-bold">$45,000</span>
                        <span className="text-[var(--text-muted)]">Hace 2d</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="mt-0">
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
            <span className="text-amber-400 font-bold">⚠ Vista Previa</span> — Los datos mostrados son de demostración. El módulo de contratos digitales estará disponible próximamente.
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 bg-[var(--bg-secondary)] border-white/5">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FileSignature className="h-5 w-5 text-indigo-400" /> Repositorio de Contratos
              </h2>
              <div className="space-y-4">
                {[
                  { name: 'Contrato_Construccion_Alpha.pdf', status: 'Firmado', date: 'Oct 12, 2025', milestones: 5 },
                  { name: 'Adendum_Acabados_V2.pdf', status: 'Pendiente', date: 'Hoy', milestones: 1 },
                  { name: 'Diseno_Conceptual_FamiliaR.pdf', status: 'Firmado', date: 'Sep 05, 2025', milestones: 3 }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 mt-1">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm">{doc.name}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-[var(--text-muted)]">{doc.date}</span>
                          <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                            <CheckSquare className="h-3 w-3 text-indigo-400" />
                            {doc.milestones} hitos de pago
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      doc.status === 'Firmado'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <Button onClick={() => toast.info('Próximamente: Módulo de Contratos Digitales Inteligentes')} className="w-full mt-6 gap-2 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="h-4 w-4" /> Nuevo Contrato
              </Button>
            </Card>

            <Card className="p-6 bg-[var(--bg-secondary)] border-white/5 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" /> Aprobaciones Digitales
              </h2>
              <div className="relative border-l-2 border-white/10 ml-3 space-y-8 pb-4">

                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[var(--bg-secondary)]" />
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-white font-medium text-sm">Cambio de piso porcelanato aprobado</h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Por: Alberto Rojas (Cliente)</p>
                    <p className="text-xs font-mono text-emerald-400 mt-2">Firma Dig: 0x8f...2a4c | Ayer 14:32</p>
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-500 border-4 border-[var(--bg-secondary)]" />
                  <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
                    <h4 className="text-white font-medium text-sm">Solicitud extensión deck exterior</h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Enviado al cliente para revisión.</p>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs border-amber-500/50 text-amber-400 hover:bg-amber-500/20">Re-enviar Notificación</Button>
                    </div>
                  </div>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[var(--bg-secondary)]" />
                  <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                    <h4 className="text-white font-medium text-sm">Presupuesto inicial base firmado</h4>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Por: Alberto Rojas (Cliente)</p>
                    <p className="text-xs font-mono text-emerald-400 mt-2">Firma Dig: 0x3d...7b1e | Oct 12, 2025</p>
                  </div>
                </div>

              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portal" className="mt-0">
          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm flex items-center gap-2">
            <span className="text-amber-400 font-bold">⚠ Vista Previa</span> — Los datos mostrados son de demostración. El portal de cliente estará disponible próximamente.
          </div>
          <Card className="p-0 bg-[var(--bg-secondary)] border-white/5 overflow-hidden min-h-[500px] flex flex-col md:flex-row">
            <div className="w-full md:w-1/3 p-6 border-r border-white/5 bg-black/20">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 border border-indigo-500/30 shadow-lg shadow-indigo-500/10">
                <Presentation className="h-8 w-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2 font-[var(--font-space-mono)] tracking-tight">Portal Cliente</h2>
              <p className="text-sm text-[var(--text-muted)] mb-8">
                Genera reportes elegantes en 1 clic con el avance constructivo, fotos y gastos listos para enviar al cliente.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70 uppercase">Proyecto a Reportar</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <option>Familia Rojas - Casa Habitación</option>
                    <option>Torre Empresarial Alpha</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-medium text-white/70 uppercase">Incluir en Reporte</label>
                  <div className="space-y-2 text-sm text-[var(--text-secondary)]">
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-indigo-500/30" /> Resumen Ejecutivo AI</label>
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-indigo-500/30" /> Bitácora de Campo (Fotos)</label>
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-indigo-500/30" /> Avance Gantt / Kanban</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-indigo-500/30" /> Estado Financiero</label>
                  </div>
                </div>

                <Button className="w-full mt-6 gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-lg shadow-indigo-500/25 h-12">
                  <Presentation className="h-5 w-5" /> Generar Muestra Cero
                </Button>
              </div>
            </div>

            <div className="flex-1 p-8 bg-[var(--bg-primary)] flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-x-0 inset-y-0 opacity-30 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

              <div className="relative w-full max-w-lg bg-white p-8 rounded-xl shadow-2xl transition-transform duration-500 group-hover:scale-105 rotate-1 group-hover:rotate-0">
                <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-4">
                  <div className="text-gray-900 font-bold text-xl tracking-widest">ESTUDIO ARQ.</div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 font-mono">REPORTE MENSUAL</p>
                    <p className="text-xs text-indigo-600 font-bold mt-1">OCTUBRE 2025</p>
                  </div>
                </div>

                <h3 className="text-gray-800 font-bold mb-4">Proyecto: Familia Rojas</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Estimado cliente, adjuntamos el reporte de avance de la obra. En este periodo logramos un avance del 15% sobre la ruta crítica, finalizando zapatas estructurales e iniciando muros perimetrales.
                </p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600 font-medium">Avance Global</span>
                    <span className="text-indigo-600 font-bold">45%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[45%]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-gray-200 rounded animate-pulse" />
                  <div className="aspect-video bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="mt-8 flex justify-between">
                  <Button onClick={() => toast.success('PDF encriptado y enviado exitosamente al cliente')} variant="outline" className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 gap-2"><Send className="h-4 w-4" /> Enviar PDF al Cliente</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
