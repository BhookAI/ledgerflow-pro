# LedgerFlow Pro - Versión Local

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- Supabase Local (Docker) - YA CONFIGURADO
- npm o yarn

### 1. Iniciar Supabase Local

```bash
# Si tienes Supabase CLI
supabase start

# O si usas Docker directamente
docker ps | grep supabase  # Verificar que esté corriendo
```

Servicios de Supabase:
- API: http://localhost:54321
- Studio: http://localhost:54323
- PostgreSQL: localhost:54322

### 2. Iniciar LedgerFlow

```bash
cd LedgerFlowPro
./iniciar.sh
```

O manualmente:
```bash
npm install
npm run dev
```

### 3. Acceder

- App: http://localhost:3000
- Login: yoenqueco@gmail.com / Pajarraco7488

## 📁 Estructura

```
LedgerFlowPro/
├── app/                    # Código Next.js
├── components/             # Componentes React
├── lib/                    # Utilidades
├── database/               # Schemas SQL
│   ├── schema_geotecnia.sql
│   └── schema_simple.sql
├── uploads/                # Archivos subidos (local)
├── backups/                # Respaldos
├── .env.local             # Configuración
├── iniciar.sh             # Script de inicio
└── README-LOCAL.md        # Este archivo
```

## 🗄️ Base de Datos

La base de datos corre en **Supabase Local** (Docker):
- PostgreSQL 15
- PostgREST API
- Auth integrado
- Storage local

Para reconstruir la BD:
```bash
psql postgresql://postgres:postgres@localhost:54322/postgres -f database/schema_geotecnia.sql
```

## 💾 Backup de Datos

### Exportar datos:
```bash
pg_dump postgresql://postgres:postgres@localhost:54322/postgres > backups/backup-$(date +%Y%m%d).sql
```

### Importar datos:
```bash
psql postgresql://postgres:postgres@localhost:54322/postgres < backups/backup-20250310.sql
```

## 🔧 Configuración

Edita `.env.local` para cambiar:
- API Keys de IA
- Configuración de email
- URLs de servicios

## 🌟 Funcionalidades

- ✅ Análisis de estudios de suelo con IA
- ✅ Generación automática de cotizaciones
- ✅ Gestión de clientes y proyectos
- ✅ Reportes de cobro y seguimiento
- ✅ Todo 100% local (sin nube)

## 🆘 Soporte

Si hay problemas:
1. Verificar que Supabase esté corriendo: `docker ps`
2. Verificar logs: `npm run dev` (ver errores)
3. Reiniciar: `pkill -f node && npm run dev`

## 📞 Contacto

Desarrollado por: Vex (OpenClaw)
Usuario: Axel/Hael
Fecha: 2026-03-10
