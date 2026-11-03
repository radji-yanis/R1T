# ADR 006 : L'anglais comme langue du code, de l'API et de la base de données

## Statut

Accepté

## Contexte

Le projet mélangeait deux langues. La base de données était en français (`utilisateur`, `rencontre`, `inscription`), alors qu'une grande partie du code, des messages d'erreur de l'API et des messages de commit était en anglais. Ce mélange a créé des incohérences concrètes : le gestionnaire d'erreurs répondait avec la clé `erreur` alors que les routes répondaient avec `error`, si bien que le front devait lire deux noms différents selon le cas. Les requêtes SQL mélangeaient aussi les deux langues.

Le groupe a d'abord envisagé de tout passer en français, puis a changé d'avis et choisi l'anglais, y compris pour la base de données. Le choix de la langue était libre : rien n'a été imposé.

## Décision

Le code, l'API et la base de données sont écrits en **anglais** :
- **les noms de variables et de fonctions** (par exemple `getById`, `cancelById`) ;
- **les adresses des routes** ;
- **les messages d'erreur et les clés JSON de l'API** (par exemple `{ "error": "Match not found" }`) ;
- **les noms des tables, des colonnes, des types et des valeurs d'énumération** de la base de données ;
- **les messages de commit**, au format `type: description` avec les types `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, comme le prévoit l'ADR 001 ;
- **les noms de branches**, avec les mêmes préfixes (`feature/`, `fix/`, `docs/`, `refactor/`) ;
- **les titres et descriptions des pull requests**.

Ce qui reste en français :
- **les textes affichés à l'utilisateur** dans l'interface (« Fermer », « Mon profil »), puisque l'application s'adresse à des joueurs francophones ;
- **les documents du projet** (README, ADR).

Dans les noms de variables, de fonctions, de routes et de colonnes, on n'utilise pas d'accents.

Pour la base de données, on évite les mots réservés de PostgreSQL comme noms de tables ou de colonnes (par exemple `user`), qui obligeraient à les écrire entre guillemets partout.

Le code et la base existants sont **mis en conformité maintenant**, et pas seulement le nouveau.

## Alternatives écartées

- **Tout en français** : envisagé, puis abandonné par le groupe, parce que le français est moins courant dans le code professionnel et donne une image moins professionnelle du projet aux personnes à qui il est présenté (jury, recruteurs, portfolio). De plus, l'anglais est déjà la langue des mots-clés de JavaScript et de SQL, des bibliothèques et de la convention de commit utilisées : avec l'anglais, le code se lit dans une seule langue, alors qu'avec le français il aurait mélangé les deux à chaque ligne.
- **L'anglais pour le code, mais la base de données en français** : ce serait le plus rapide, puisque la base existe déjà, mais les requêtes SQL, les clés JSON de l'API (qui reprennent les noms des colonnes) et le code continueraient à mélanger les deux langues.
- **Garder le mélange** : c'est ce qui a produit les incohérences comme `erreur` et `error`. Il fallait une règle claire.

## Conséquences

**Avantages**
- Une seule règle pour le code, l'API, la base et Git : les noms écrits par l'équipe sont dans la même langue que les mots-clés de JavaScript et de SQL, les bibliothèques et la convention de commit.
- Les requêtes SQL ne mélangent plus deux langues.
- Les clés JSON de l'API viennent directement des noms des colonnes : elles seront cohérentes avec le code du front et du back.

**Contraintes**
- Renommer la base est un gros chantier : il touche les migrations (`up`, `down`), le seed, **toutes** les requêtes SQL des modèles, le modèle conceptuel de données, et il oblige à recréer la base chez chaque membre de l'équipe.
- Les clés JSON de l'API changent avec les noms des colonnes : le front doit être mis à jour partout où il lit une réponse du back.
- Pendant la migration, il faut se coordonner pour éviter les conflits sur les fichiers partagés (`index.js`, les routes, les modèles), et migrer la base et le code ensemble, sans quoi l'application ne fonctionne plus entre les deux.
- Les messages d'erreur de l'API sont en anglais, alors que l'interface est en français : si le front les affiche tels quels, l'utilisateur les voit en anglais. Il faudra les traduire côté front, ou afficher un texte français à la place.
- Les tests faits à la main (Thunder Client) et les descriptions de PR existantes utilisent encore les anciens noms.
- Il faut tenir à jour la règle pour les nouveaux arrivants : code, base et Git en anglais, interface et documents en français.