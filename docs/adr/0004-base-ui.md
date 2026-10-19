# ADR 004 : Choix de la bibliothèque Base UI

## Statut

Accepté

## Contexte

L'interface a besoin de composants dont le comportement est complexe : un tiroir qui s'ouvre et se ferme en glissant, des notifications qui s'empilent et disparaissent. Les écrire à la main demande du temps, et il faut aussi gérer l'accessibilité (clavier, lecteurs d'écran).

L'équipe veut en même temps garder son propre style, celui de ses maquettes. Le choix de la bibliothèque était libre : rien n'a été imposé.

## Décision

- Le projet utilise **`@base-ui/react`** (version `^1.9.0`) pour les composants qui ont un comportement : `Drawer` pour le tiroir (`BottomDrawer`) et `Toast` pour les notifications (`ToastNotification`).
- Le **style est écrit par l'équipe**, en CSS modules : la bibliothèque fournit le comportement, pas l'apparence.
- Les pages n'utilisent pas la bibliothèque directement pour les notifications : elles passent par le hook `useToast`, qui isole la bibliothèque dans un seul fichier.

## Alternatives écartées

- **Écrire les composants à la main** : écarté, parce que le comportement (ouverture, fermeture, glissement, empilement) est déjà fourni par la bibliothèque.
- **D'autres bibliothèques de composants** : le groupe en a comparé plusieurs et a choisi Base UI parce que le comportement est déjà fait et qu'on peut garder son propre style.


## Conséquences

**Avantages**
- Le comportement est prêt, accessibilité comprise : on n'a pas à réécrire le glissement du tiroir ni l'empilement des toasts.
- L'équipe garde la maîtrise de son design, puisque le style reste à écrire.
- Le hook `useToast` limite l'usage de la bibliothèque à un seul fichier pour les notifications : si on change de bibliothèque, les pages n'ont pas à être modifiées.

**Contraintes**
- C'est une dépendance externe à maintenir : la version est fixée dans `front/package.json`, et toute l'équipe doit refaire `npm install` quand elle change.
- Il faut apprendre son fonctionnement et suivre sa documentation.
- Le CSS dépend de ce que la bibliothèque fournit (attributs `data-*` et variables CSS comme `--toast-index`) : une mise à jour majeure peut demander de l'adapter.
