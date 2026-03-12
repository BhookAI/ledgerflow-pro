#!/bin/bash
echo "🚀 INICIANDO LEDGERFLOW PRO"
echo "==========================="
echo ""

# Verificar que Supabase esté corriendo
if ! curl -s http://localhost:54321/rest/v1/ > /dev/null; then
    echo "❌ Supabase no está corriendo"
    echo ""
    echo "Para iniciar Supabase local:"
    echo "  cd /ruta/a/supabase"
    echo "  supabase start"
    echo ""
    echo "O si usas Docker:"
    echo "  docker-compose up -d"
    echo ""
    exit 1
fi

echo "✅ Supabase local detectado"
echo ""

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Iniciar la app
echo "🌐 Iniciando LedgerFlow..."
echo "   URL: http://localhost:3000"
echo ""
npm run dev
