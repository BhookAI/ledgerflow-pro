#!/bin/bash
FECHA=$(date +%Y%m%d_%H%M%S)
echo "💾 Creando backup..."
pg_dump postgresql://postgres:postgres@localhost:54322/postgres > "backups/backup_$FECHA.sql"
echo "✅ Backup guardado: backups/backup_$FECHA.sql"
