Write-Host "🚀 Démarrage de l'application École Privée..." -ForegroundColor Green

# Vérifier si Docker est en cours d'exécution
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker n'est pas en cours d'exécution. Veuillez démarrer Docker." -ForegroundColor Red
    exit 1
}

# Démarrer PostgreSQL
Write-Host "📦 Démarrage de PostgreSQL..." -ForegroundColor Yellow
docker-compose up -d postgres

# Attendre que PostgreSQL soit prêt
Write-Host "⏳ Attente de PostgreSQL..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Vérifier si Prisma est configuré
if (-not (Test-Path "node_modules/@prisma/client")) {
    Write-Host "🔧 Configuration de Prisma..." -ForegroundColor Yellow
    npx prisma generate
    npx prisma db push
    
    # Seeder si nécessaire
    if (Test-Path "scripts/seed.ts") {
        Write-Host "🌱 Initialisation des données..." -ForegroundColor Yellow
        npx tsx scripts/seed.ts
    }
}

# Démarrer l'application
Write-Host "🌐 Démarrage de l'application Next.js..." -ForegroundColor Green
yarn dev
