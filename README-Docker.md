# Configuration Docker pour l'École Privée

## Prérequis

- Docker et Docker Compose installés
- Node.js 18+ (pour le développement local)
- Yarn ou npm

## Configuration rapide

### 1. Démarrer PostgreSQL avec Docker

```bash
# Démarrer uniquement PostgreSQL
docker-compose up -d postgres
```

### 2. Configurer Prisma et la base de données

**Sur Linux/Mac :**
```bash
chmod +x setup-database.sh
./setup-database.sh
```

**Sur Windows (PowerShell) :**
```powershell
.\setup-database.ps1
```

**Ou manuellement :**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma à la base de données
npx prisma db push

# (Optionnel) Seeder la base de données
npx tsx scripts/seed.ts
```

### 3. Démarrer l'application

**Option 1 : Développement local (recommandé)**
```bash
yarn dev
```

**Option 2 : Avec Docker**
```bash
docker-compose up -d
```

## Configuration de la base de données

### Variables d'environnement

Le fichier `.env` a été configuré pour utiliser PostgreSQL local :

```env
DATABASE_URL="postgresql://ecole_user:ecole_password@localhost:5432/ecole_privee"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="fnfT1mQ2dWCmwv3ac62Tr1BTmGCvQ4aN"
```

### Comptes de test créés

Après l'exécution du script de seed, vous pouvez vous connecter avec :

- **Admin :** admin@ecole.com / admin123
- **Professeur :** marie.dubois@ecole.com / prof123
- **Test requis :** john@doe.com / johndoe123

### Accès à la base de données

- **Host :** localhost
- **Port :** 5432
- **Database :** ecole_privee
- **Username :** ecole_user
- **Password :** ecole_password

## Commandes utiles

```bash
# Voir les logs de PostgreSQL
docker-compose logs postgres

# Accéder à la console PostgreSQL
docker-compose exec postgres psql -U ecole_user -d ecole_privee

# Redémarrer les services
docker-compose restart

# Arrêter tous les services
docker-compose down

# Supprimer les volumes (⚠️ supprime les données)
docker-compose down -v

# Voir le statut des conteneurs
docker-compose ps
```

## Prisma Studio

Pour explorer la base de données avec une interface graphique :

```bash
npx prisma studio
```

Accessible sur : http://localhost:5555

## Dépannage

### Erreur "prisma generate"
```bash
npx prisma generate
```

### Erreur de connexion à la base de données
1. Vérifiez que PostgreSQL est démarré : `docker-compose ps`
2. Vérifiez les logs : `docker-compose logs postgres`
3. Redémarrez le service : `docker-compose restart postgres`

### Réinitialiser la base de données
```bash
docker-compose down -v
docker-compose up -d postgres
npx prisma db push
```
