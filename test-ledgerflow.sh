#!/bin/bash
echo "🧪 TESTING LEDGERFLOW PRO"
echo "=========================="

# 1. Verificar servidor
if ! curl -s http://localhost:3000 | grep -q "LedgerFlow"; then
    echo "❌ Servidor no está corriendo"
    exit 1
fi

# 2. Test con agent-browser
echo "📸 Test 1: Página de login..."
agent-browser open http://localhost:3000
sleep 2
agent-browser screenshot /tmp/test-01-login.png
echo "✅ Screenshot login guardado"

echo "🔐 Test 2: Login..."
agent-browser fill "#admin-email" "yoenqueco@gmail.com"
agent-browser fill "#admin-password" "Pajarraco7488"
agent-browser click "#admin-login-btn"
sleep 5

agent-browser screenshot /tmp/test-02-dashboard.png
echo "✅ Screenshot dashboard guardado"

echo "📊 URL actual:"
agent-browser eval "window.location.href"

echo "🧪 Test 3: Navegación a upload..."
agent-browser open http://localhost:3000/dashboard/estudios/upload
sleep 2
agent-browser screenshot /tmp/test-03-upload.png
echo "✅ Screenshot upload guardado"

echo ""
echo "✅ Tests completados"
echo "📁 Revisar screenshots en /tmp/test-*.png"

agent-browser close
