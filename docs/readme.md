# R1T

Application web pour organiser et rejoindre des matchs de foot : un joueur trouve une rencontre près de chez lui et s'y inscrit, un organisateur crée ses matchs et suit les inscrits.

Projet fil rouge Ada Tech, arc 1.

**Stack** : React (Vite) pour le front, Node.js et Express pour le back, PostgreSQL dans Docker.

## Prérequis

- **Git**
- **Node.js** 20.19 ou plus (22 LTS conseillé), avec npm
- **Docker Desktop** (avec Docker Compose), ouvert pendant que tu travailles

Pas besoin d'installer PostgreSQL : la base tourne dans un conteneur.

## 1. Cloner et installer

```bash
# Cloner le dépôt
git clone https://github.com/radji-yanis/R1T.git
cd R1T

# Installer les dépendances du back
cd back
npm install
cd ..

# Installer les dépendances du front
cd front
npm install
cd ..

# Créer le fichier d'environnement du back
cp back/.env.example back/.env
```

Ouvre `back/.env` et remplis les valeurs (réservées au développement local, le fichier n'est jamais commité) :

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=r1t
DB_PASSWORD=r1t_dev
DB_NAME=r1t
JWT_SECRET=change_me
```

## 2. Lancer la base de données

```bash
# Démarrer PostgreSQL
docker compose up -d

# Créer les tables
docker exec -i r1t-db psql -U r1t -d r1t < back/db/migration_up.sql

# Charger les données de test
docker exec -i r1t-db psql -U r1t -d r1t < back/db/seed.sql
```

> Sous Windows, utilise **Git Bash** : la redirection `<` ne fonctionne pas dans PowerShell.

## 3. Lancer l'application

Dans **deux terminaux** :

```bash
# Terminal 1 : back (http://localhost:3000)
cd back
npm run dev
```

```bash
# Terminal 2 : front (http://localhost:5173)
cd front
npm run dev
```

## À compléter

- [ ] Contexte et objectif du projet
- [ ] Fonctionnalités de la V1
- [ ] Conventions Git : noms de branches, format des commits, relecture
- [ ] Décisions techniques (ADR)