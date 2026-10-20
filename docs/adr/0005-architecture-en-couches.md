# ADR 005 : Architecture en couches pour le back

## Statut

Accepté 

## Contexte

Aujourd'hui, chaque fichier de route du back fait tout à la fois : il lit la requête, applique les règles métier, écrit le SQL et choisit la réponse. À mesure que les routes se multiplient (inscription, profil, création et annulation de match, modification de profil), deux problèmes apparaissent :
- des règles risquent d'être recopiées à plusieurs endroits (par exemple « un match est complet » ou « le joueur existe ») ;
- les fichiers grossissent, et plusieurs personnes modifient les mêmes (`rencontres.js`, `index.js`), ce qui multiplie les conflits.

Le choix de l'organisation du code était libre : rien n'a été imposé.

## Décision

Le back est organisé en **quatre couches**, chacune dans son dossier de `back/src/` :

| Couche | Dossier | Rôle |
|---|---|---|
| Route | `routes/` | associe une adresse à un contrôleur |
| Contrôleur | `controllers/` | lit la requête (`req`), appelle le service, envoie la réponse (`res`) |
| Service | `services/` | applique les règles métier, sans dépendre d'Express |
| Modèle | `models/` | contient les requêtes SQL, et lit le résultat de la base |

Le groupe a choisi d'appeler la dernière couche `models/` plutôt que `repositories/` : c'est le même rôle, avec un nom qui nous parle davantage.

Les règles de placement :
- Seul le **contrôleur** touche à `req` et `res`.
- Seul le **modèle** utilise la connexion à la base (`pool`).
- Chaque couche ne connaît que celle du dessous : route, puis contrôleur, puis service, puis modèle.
- Les couches se passent de simples valeurs (un id, un pseudo), jamais la requête HTTP elle-même.
- Quand une règle est cassée, le service lance une erreur qui porte un code HTTP (400, 404, 409), et le contrôleur la transforme en réponse.

On écrit une fonctionnalité **de bas en haut** : le modèle d'abord, puis le service, le contrôleur et enfin la route. Les nouvelles routes suivent cette organisation.

## Alternatives écartées

- **Le modèle MVC** (modèle, vue, contrôleur) : le groupe l'a jugé trop complexe et pas adapté à notre projet.
- **L'architecture hexagonale** (ports et adaptateurs) : le groupe l'a jugée trop complexe et pas adaptée à notre projet.
- **Garder tout dans les fichiers de routes** : simple et rapide quand il y a peu de routes, mais les règles se dupliquent et les fichiers deviennent longs à mesure que le projet grandit.
- **Deux couches seulement** (routes, puis un service qui contient la logique et le SQL) : moins de fichiers, mais la logique et le SQL restent mélangés dans le même endroit.

## Conséquences

**Avantages**
- Chaque fichier est court et n'a qu'un seul rôle, donc plus facile à relire.
- Une règle est écrite une seule fois et réutilisée (par exemple « le joueur existe » pour le profil et pour sa modification).
- Le service peut être testé sans serveur HTTP.
- Moins de conflits Git : plusieurs personnes travaillent sur des fichiers différents.
- Changer la façon de lire la base ne touche que les modèles.

**Contraintes**
- Une route demande quatre fichiers au lieu d'un, ce qui alourdit les petites routes.
- Chaque membre doit savoir où placer chaque chose (`req` et `res` dans le contrôleur, le SQL dans le modèle).
- Les routes existantes doivent être migrées, dans des PR de réorganisation séparées des fonctionnalités. Les deux styles cohabitent pendant la transition.
