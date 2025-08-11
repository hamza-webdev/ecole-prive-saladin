#!/bin/bash

echo "🚀 Configuration de la base de données pour l'École Privée..."

# Démarrer les services Docker
echo "📦 Démarrage des conteneurs Docker..."
docker-compose up -d postgres

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de PostgreSQL..."
sleep 10

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
echo "📊 Application des migrations Prisma..."
npx prisma db push

# Optionnel : Seeder la base de données
echo "🌱 Initialisation des données de base..."
if [ -f "scripts/seed.ts" ]; then
    npx tsx scripts/seed.ts
fi

echo "✅ Configuration terminée ! Vous pouvez maintenant démarrer l'application avec:"
echo "   docker-compose up -d"
echo "   ou"
echo "   yarn dev (pour le développement local)"
