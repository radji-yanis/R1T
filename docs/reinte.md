## Problématique

Aujourd'hui, organiser ou trouver un match de foot entre potes, c'est super compliqué : il faut envoyer des dizaines de messages, relancer tout le monde, gérer les annulations de dernière minute et essayer de faire concorder les emplois du temps. Quand on a déjà des journées bien remplies, ça prend trop d'énergie et on finit souvent par laisser tomber.

**Le vrai problème résolu :** l'application permet de trouver ou de compléter un match de la manière la plus rapide qui soit selon ses disponibilités, sans avoir besoin de passer des heures à chercher des joueurs autour de soi.

## Cible prioritaire

**Profil :** Nas, 30 ans, active avec des semaines chargées, passionnée de football mais sans équipe fixe disponible au même rythme qu'elle.

**Justification du choix :** C’est elle qui a le plus à perdre : comme elle n'a pas le temps de gérer des groupes WhatsApp ou de courir après les gens pour caler une date, elle lâche l'affaire dès que ça devient trop compliqué.

**Usage direct :** Si la solution fonctionne pour quelqu'un qui a peu de créneaux et zéro temps à perdre, elle répondra d'autant plus facilement aux joueurs plus flexibles.

## Périmètre fonctionnel de la V1

Le périmètre de lancement se concentre sur les fonctionnalitées vraiment essentielle au bon fonctionnement de l'application : trouver un créneau, bloquer sa place et jouer.

### Dans le scope :

**Authentification simple :** Inscription, connexion, déconnexion.

**Profil joueur essentiel :** Pseudo, poste préférentiel et niveau qui sera choisi par l'utilisateur.

**Consultation & Recherche :** Liste chronologique des rencontres disponibles avec filtres basiques (date, heure, ville/lieu, format 5v5 ou 11v11, ambiance loisir ou compétitive).

**Participation :** Fiche détaillée du match (créneau, adresse, nombre de places restantes, liste des inscrits), action de rejoindre et possibilité de se désister avant l'événement.

**Organisation minimale :** Création d'une rencontre (saisie des critères, nombre de places), modification des infos par l'organisateur et annulation.

**Dashboard personnel :** Vue claire des prochains matchs auxquels l'utilisateur est inscrit ou qu'il organise.

### Hors scope :

Toutes les fonctionnalités non indispensables à la complétion du premier match sont reportées aux versions ultérieures.

**Jeux et personnalisation :** Cartes de profil avancées (style FUT), skins personnalisables, affichage du club favori, élection du MVP, calcul des statistiques individuelles (buts, passes décisives).

**Réseau social :** Système d'amis, flux d'activité des contacts, messagerie interne instantanée, historique relationnel entre joueurs.

**Modération & Réputation avancée :** Système de cartons d'absence, notation/feedback entre joueurs post-match, formulaires de signalement dédiés (gérés manuellement hors produit au départ).

**Interface cartographique :** Vue carte interactive (recherche assurée uniquement par filtres de texte/villes en V1).


📌 User Stories & Critères d'Acceptation

🔴 En tant qu’organisateur, je veux pouvoir créer un match, définir sa date et sa localisation, et suivre les inscriptions des joueurs afin de gérer mes rencontres.
Étant donné que je suis connecté en tant qu'organisateur,
Quand je renseigne les informations obligatoires et valide la création,
Alors le match est créé et devient visible pour les joueurs.

🔴 En tant que joueur, je voudrais avoir la possibilité de consulter la liste des matchs afin d'y participer.
Étant donné que plusieurs matchs sont disponibles,
Quand je me connecte,
Alors je peux consulter la liste de tous les matchs.

🔴 En tant que joueur, je voudrais trouver des matchs selon mes disponibilités et mes critères afin de faciliter ma participation.
Étant donné que plusieurs matchs sont disponibles,
Quand je renseigne une date,
Alors les matchs correspondant à mes critères sont affichés.

🔴 En tant que joueur, je voudrais consulter les détails d'un match afin d’être sûr que la rencontre me convient.
Étant donné que je n’ai pas tous les détails du match depuis la vue d'ensemble,
Quand je clique sur un match,
Alors je peux consulter tous les détails, voir la liste des joueurs déjà inscrits

🔴 En tant que joueur, je voudrais rejoindre un match.
Étant donné que j’ai accédé à une rencontre ,
Quand je clique sur “rejoindre le match”,
Alors je rejoins la rencontre.

🟠 En tant que joueur, je voudrais trouver des matchs en fonction d’une localisation choisie afin de participer à des rencontres proches de chez moi.
Étant donné que plusieurs matchs sont disponibles,
Quand je renseigne ma localisation et un rayon (en km),
Alors les matchs à proximité correspondant au périmètre choisi sont affichés.

🟠 En tant que joueur, j’aimerais avoir accès aux matchs auxquels je suis inscrit.
Étant donné que je suis inscrit à un ou plusieurs matchs,
Quand je clique sur « Mes matchs »,
Alors je vois les rencontres que j’ai rejoint.

🟢 En tant que joueur, je voudrais voir automatiquement les matchs situés autour de moi sans être pollué par des rencontres trop éloignées afin de trouver rapidement une partie.
Étant donné que plusieurs matchs sont disponibles et que ma géolocalisation est active,
Quand je me connecte ou consulte l'accueil,
Alors la liste des matchs à proximité est affichée par défaut.

🟢 En tant que joueur·euse, je veux pouvoir modifier et compléter mon profil afin d’avoir des informations à jour et personnalisées.
Étant donné que je suis connecté·e à mon compte,
Quand je modifie mes informations personnelles sur mon profil et que je valide,
Alors les changements sont enregistrés et visibles sur mon profil.

🟢 En tant que joueur, j’aimerais pouvoir me désister en cas d’empêchement afin de ne pas perturber l’organisation de la rencontre.
Étant donné que je suis inscrit à un ou plusieurs matchs,
Quand je clique sur « Se désister » depuis la section « Mes matchs »,
Alors ma participation à la rencontre est annulée.

🟣 En tant que joueur·euse, je veux pouvoir m’inscrire et créer mon compte afin d’avoir accès à mon espace personnel.
Étant donné que je ne possède pas encore de compte,
Quand je renseigne mes informations d'inscription et valide le formulaire,
Alors mon compte est créé et je suis automatiquement connecté·e à mon espace personnel.
