## Prérequis

- Git
- Node.js 20.19 ou plus (22 LTS conseillé), avec npm
- Docker Desktop (avec Docker Compose), ouvert pendant que tu travailles

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

Ouvre `back/.env` et adapte les valeurs. Ce fichier sert au back **et** à Docker Compose, et il n'est jamais commité :

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=r1t
DB_PASSWORD=r1t_dev
DB_NAME=r1t
JWT_SECRET=change_me
CLIENT_URL=http://localhost:5173
```

- Choisis le mot de passe que tu veux : c'est une valeur locale.
- `JWT_SECRET` est la clé qui signe les tokens de connexion. Tu peux garder `change_me` en local, ou en générer un plus solide avec cette commande, puis coller le résultat dans `back/.env` :

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

- Si le port **5432 est déjà utilisé** sur ta machine (un PostgreSQL installé, un autre conteneur…), mets un autre `DB_PORT`, par exemple `5433`. Le back et la base utiliseront automatiquement la même valeur.

## 2. Lancer la base de données

Toutes les commandes `docker compose` se lancent **depuis le dossier `back/`**.

```bash
cd back

# Démarrer PostgreSQL
docker compose up -d

# Créer les tables
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < db/migration_up.sql

# Charger les données de test
docker compose exec -T db sh -c 'psql -U "$POSTGRES_USER" -d "$POSTGRES_DB"' < db/seed.sql
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

## 4. Commandes utiles

Depuis `back/` :

```bash
docker compose ps        # voir si la base tourne
docker compose logs db   # voir les messages de la base
docker compose down      # arrêter la base (les données sont conservées)
```

> Attention : `docker compose down -v` **efface les données** de la base. Il faudra relancer la migration et le seed.

## 5. Problèmes fréquents

| Message | Cause et solution |
|---|---|
| `port is already allocated` ou `address already in use` | Le port est pris. Change `DB_PORT` dans `back/.env` (par exemple `5433`), puis relance `docker compose up -d`. |
| `The "DB_USER" variable is not set` | Tu n'es pas dans `back/`, ou `back/.env` n'existe pas. Lance la commande depuis `back/` après `cp .env.example .env`. |
| `container name "/r1t-db" is already in use` | Un ancien conteneur existe. Supprime-le avec `docker rm -f r1t-db`, puis relance `docker compose up -d`. Les données sont dans un volume et ne sont pas perdues. |
| `password authentication failed` | Le mot de passe du `.env` n'est pas celui avec lequel la base a été créée. Pour repartir de zéro : `docker compose down -v`, puis `docker compose up -d`, puis la migration et le seed. |
| Le back ne se connecte pas | Vérifie que Docker Desktop est ouvert et que `docker compose ps` indique `Up`. |