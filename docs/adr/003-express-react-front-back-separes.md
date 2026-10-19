# ADR 003 : Choix d'Express et de React, avec front et back séparés

## Statut

Accepté

## Contexte

L'application a besoin d'une interface pour les joueurs et d'un serveur qui gère les données. L'équipe a choisi sa stack librement : React et Node.js avec Express sont ceux qu'elle a vus en formation, et aucune technologie n'a été imposée.

Plusieurs personnes travaillent en même temps sur le projet. Le code doit rester facile à comprendre et à relire.

## Décision

- **Front** : React, avec Vite, dans le dossier `front/`.
- **Back** : Node.js avec Express, dans le dossier `back/`.
- Les deux parties sont dans **deux dossiers séparés** d'un même dépôt, chacun avec son `package.json`.
- Le front communique avec le back par une API HTTP qui échange du JSON. Le back autorise les appels du front grâce à CORS.

## Alternatives écartées

- **Un seul projet pour tout le code** : écarté, parce que c'est plus difficile à comprendre et à relire, et que deux personnes ne peuvent pas travailler aussi facilement en parallèle sur l'interface et sur le serveur.
- **Une autre stack** (par exemple un framework qui regroupe front et back) : non comparée en détail. Le groupe a retenu la stack qu'il connaît.

## Conséquences

**Avantages**
- Le code est plus simple à comprendre et à relire : chaque dossier a une seule responsabilité.
- Deux personnes peuvent avancer en parallèle sans se gêner, l'une sur le front et l'autre sur le back.
- L'API sert de contrat entre les deux parties : une route peut être testée seule, par exemple avec Thunder Client, avant d'être utilisée par l'interface.

**Contraintes**
- Il y a deux ensembles de dépendances à installer (`npm install` dans `front` et dans `back`) et deux serveurs à lancer, sur des ports différents.
- Le back doit autoriser les appels du front (CORS).
- Les noms de routes et le format des réponses (par exemple les clés `message` et `error`) doivent rester cohérents entre le front et le back, sinon l'interface ne comprend plus les réponses du serveur.
