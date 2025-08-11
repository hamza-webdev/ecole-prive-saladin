#!/bin/bash

echo "🚀 Démarrage de l'application École Privée..."

# Vérifier si Docker est en cours d'exécution
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker n'est pas en cours d'exécution. Veuillez démarrer Docker."
    exit 1
fi

# Démarrer PostgreSQL
echo "📦 Démarrage de PostgreSQL..."
docker-compose up -d postgres

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de PostgreSQL..."
sleep 5

# Vérifier si Prisma est configuré
if [ ! -d "node_modules/@prisma/client" ]; then
    echo "🔧 Configuration de Prisma..."
    npx prisma generate
    npx prisma db push
    
    # Seeder si nécessaire
    if [ -f "scripts/seed.ts" ]; then
        echo "🌱 Initialisation des données..."
        npx tsx scripts/seed.ts
    fi
fi

# Démarrer l'application
echo "🌐 Démarrage de l'application Next.js..."
yarn dev
