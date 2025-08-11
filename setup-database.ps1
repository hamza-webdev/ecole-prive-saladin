Write-Host "🚀 Configuration de la base de données pour l'École Privée..." -ForegroundColor Green

# Démarrer les services Docker
Write-Host "📦 Démarrage des conteneurs Docker..." -ForegroundColor Yellow
docker-compose up -d postgres

# Attendre que PostgreSQL soit prêt
Write-Host "⏳ Attente de PostgreSQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Générer le client Prisma
Write-Host "🔧 Génération du client Prisma..." -ForegroundColor Yellow
npx prisma generate

# Appliquer les migrations
Write-Host "📊 Application des migrations Prisma..." -ForegroundColor Yellow
npx prisma db push

# Optionnel : Seeder la base de données
Write-Host "🌱 Initialisation des données de base..." -ForegroundColor Yellow
if (Test-Path "scripts/seed.ts") {
    npx tsx scripts/seed.ts
}

Write-Host "✅ Configuration terminée ! Vous pouvez maintenant démarrer l'application avec:" -ForegroundColor Green
Write-Host "   docker-compose up -d" -ForegroundColor Cyan
Write-Host "   ou" -ForegroundColor Cyan
Write-Host "   yarn dev (pour le développement local)" -ForegroundColor Cyan
