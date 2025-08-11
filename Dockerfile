# Utiliser l'image Node.js officielle
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package.json yarn.lock ./

# Installer les dépendances
RUN yarn install --frozen-lockfile

# Copier le reste du code
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Construire l'application Next.js
RUN yarn build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["yarn", "start"]
