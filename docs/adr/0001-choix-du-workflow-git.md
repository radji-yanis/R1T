# ADR 0001 : Choix du workflow Git

## Statut

Accepté ✅

## Contexte

Le projet R1T est développé à plusieurs, sur un même dépôt. Plusieurs personnes modifient en parallèle les mêmes fichiers, par exemple `back/src/index.js` ou `back/src/routes/rencontres.js`. Sans règle commune, on s'expose à des conflits, à du code non relu sur la branche principale et à des changements qui surprennent les autres (un préfixe d'API renommé, un fichier de verrouillage modifié par erreur).

Il faut un workflow simple, que toute l'équipe applique de la même façon, et qui laisse une trace lisible de ce qui a été fait et par qui.

## Décision

- **Une branche par fonctionnalité**, créée à partir de `main` et nommée `feature/nom-de-la-fonctionnalite` (par exemple `feature/route-detail-match`).
- **`main` reste la branche stable.** On n'y pousse pas directement : tout passe par une pull request.
- **Une pull request par branche**, avec une description : ce qui change, comment le tester, les limites connues.
- **La relecture est faite par un membre de l'équipe différent de l'auteur de la PR.** N'importe quel autre membre peut approuver et fusionner. Une exception est possible pour un cas exceptionnel, signalée à l'équipe.
- **Les messages de commit sont en anglais**, au format `type: description courte` : `feat`, `fix`, `docs`, `chore`, `refactor`, `test`. Exemple : `feat: add route to register a player to a match`.

## Alternatives écartées

- **Pousser directement sur `main`, sans pull request.** Plus rapide, mais aucun code n'est relu, et une erreur arrive immédiatement chez tout le monde.
- **Une branche par personne plutôt que par fonctionnalité.** Ces branches vivent longtemps, grossissent et divergent, ce qui multiplie les conflits. Une branche par fonctionnalité reste courte et se relit facilement.

## Conséquences

**Avantages**
- Tout le code est relu avant d'arriver sur `main`, qui reste stable.
- L'historique est lisible : les types de commit (`feat`, `fix`, `docs`) indiquent d'un coup d'œil la nature de chaque changement.
- Une PR décrit le travail, ce qui sert de documentation vivante.

**Contraintes**
- Chaque fusion attend une relecture, ce qui peut ralentir l'équipe.
- Les PR doivent rester petites et être relues rapidement.
- Il faut penser à récupérer `main` (`git pull`) avant de créer une branche, et à résoudre les conflits éventuels avant la fusion.