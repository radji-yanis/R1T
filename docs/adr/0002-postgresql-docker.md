# ADR 002 : Choix de PostgreSQL avec Docker

## Statut

Accepté

## Contexte

L'application doit stocker des joueurs, des matchs et les inscriptions des joueurs aux matchs. Ces données sont liées entre elles : une inscription relie un joueur à un match, et un joueur ne peut pas s'inscrire deux fois au même match.

Le choix de la base de données était libre : aucune technologie n'a été imposée au groupe. L'équipe est à l'aise avec PostgreSQL. Il faut aussi que n'importe quel membre puisse lancer le projet sur sa machine sans installation particulière.

## Décision

- **PostgreSQL** est la base de données du projet, choisie par le groupe.
- La base est lancée avec **Docker Compose** (`docker-compose.yml`, service `r1t-db`, image `postgres:16`), avec un volume pour conserver les données.
- Le schéma et les données de test sont écrits en SQL : une migration de création, une migration de suppression et un seed (`back/db/`).

## Alternatives écartées

- **Une autre base de données** (MySQL, SQLite, MongoDB) : le groupe n'a pas hésité. PostgreSQL a été retenue parce que l'équipe la connaît, et aucune autre n'a été étudiée de façon approfondie.
- **PostgreSQL installée directement sur chaque machine** : écartée, parce que chaque membre devrait l'installer et la configurer lui-même, avec des versions et des réglages qui peuvent différer.

## Conséquences

**Avantages**
- Le projet se lance avec une seule commande (`docker compose up -d`), sans machine spéciale : tout passe par Docker.
- Tout le monde travaille avec le même environnement, ce qui évite les problèmes du type « ça marche sur ma machine ».
- Les données sont conservées dans un volume, même quand le conteneur est arrêté.
- PostgreSQL permet de garantir certaines règles directement dans la base : types énumérés (format du match, statut, style de jeu) et clé primaire composée sur les inscriptions.

**Contraintes**
- Docker Desktop doit être installé et ouvert pour lancer la base.
- Les identifiants du `docker-compose.yml` sont réservés au développement local : ils ne doivent pas être réutilisés en production.
