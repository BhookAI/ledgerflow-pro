#!/lens/bash
if [ -z "$1" ]; then
    echo "Uso: ./restaurar.sh backups/backup_20250310_120000.sql"
    exit 1
fi

echo "🔄 Restaurando base de datos..."
psql postgresql://postgres:postgres@localhost:54322/postgres < "$1"
echo "✅ Restauración completada"
