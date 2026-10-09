-- Vide les tables et remet les id à 1 (à lancer uniquement sur ta base de test)
TRUNCATE inscription, rencontre, utilisateur RESTART IDENTITY CASCADE;

-- 50 joueurs (ids 1 à 50, dans l'ordre). Mot de passe de tous les comptes : motdepasse123
INSERT INTO utilisateur (email, mot_de_passe_hash, pseudo, ville, style, avatar_id) VALUES
  ('thomas.d@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Thomas D.',   'Paris 11e',   'magicien',        3),
  ('sunny.n@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sunny N.',    'Paris 19e',   'renard_surfaces', 7),
  ('mehdi.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Mehdi K.',    'Paris 20e',   'muraille',        12),
  ('karim.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Karim B.',    'Paris 18e',   'artificier',      18),
  ('sofiane.m@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sofiane M.',  'Paris 11e',   'dernier_rempart', 22),
  ('leo.p@exemple.fr',      '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Léo P.',      'Paris 13e',   'renard_surfaces', 5),
  ('maelle.r@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Maëlle R.',   'Paris 19e',   'magicien',        27),
  ('amine.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Amine H.',    'Saint-Denis', 'muraille',        9),
  ('ines.t@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Inès T.',     'Paris 20e',   'artificier',      30),
  ('lucas.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Lucas V.',    'Paris 12e',   'dernier_rempart', 14),
  ('nadia.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nadia B.',    'Paris 18e',   'magicien',        25),
  ('hugo.l@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Hugo L.',     'Paris 13e',   'renard_surfaces', 1),
  ('yacine.a@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Yacine A.',   'Paris 11e',   'muraille',        2),
  ('chloe.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Chloé M.',    'Paris 12e',   'artificier',      4),
  ('nabil.s@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nabil S.',    'Paris 19e',   'dernier_rempart', 6),
  ('camille.d@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Camille D.',  'Paris 20e',   'magicien',        8),
  ('samir.o@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Samir O.',    'Saint-Denis', 'renard_surfaces', 10),
  ('jade.f@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Jade F.',     'Paris 13e',   'artificier',      11),
  ('ethan.g@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Ethan G.',    'Paris 18e',   'muraille',        13),
  ('lina.c@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Lina C.',     'Paris 11e',   'magicien',        15),
  ('adam.r@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Adam R.',     'Paris 12e',   'dernier_rempart', 16),
  ('manon.l@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Manon L.',    'Paris 19e',   'renard_surfaces', 17),
  ('rayan.t@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Rayan T.',    'Paris 20e',   'muraille',        19),
  ('zoe.p@exemple.fr',      '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Zoé P.',      'Paris 13e',   'artificier',      20),
  ('ilyes.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Ilyes B.',    'Saint-Denis', 'magicien',        21),
  ('anais.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Anaïs K.',    'Paris 18e',   'dernier_rempart', 23),
  ('bilal.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Bilal M.',    'Paris 11e',   'renard_surfaces', 24),
  ('clara.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Clara H.',    'Paris 12e',   'muraille',        26),
  ('dylan.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Dylan V.',    'Paris 19e',   'artificier',      28),
  ('emma.s@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Emma S.',     'Paris 20e',   'magicien',        29),
  ('farid.n@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Farid N.',    'Paris 13e',   'dernier_rempart', 3),
  ('gaelle.a@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Gaëlle A.',   'Saint-Denis', 'renard_surfaces', 5),
  ('hamza.d@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Hamza D.',    'Paris 18e',   'muraille',        7),
  ('imane.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Imane B.',    'Paris 11e',   'artificier',      9),
  ('jules.r@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Jules R.',    'Paris 12e',   'magicien',        12),
  ('kenza.o@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Kenza O.',    'Paris 19e',   'dernier_rempart', 14),
  ('louis.f@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Louis F.',    'Paris 20e',   'renard_surfaces', 18),
  ('melissa.g@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Mélissa G.',  'Paris 13e',   'muraille',        22),
  ('nolan.c@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nolan C.',    'Saint-Denis', 'artificier',      25),
  ('oceane.p@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Océane P.',   'Paris 18e',   'magicien',        27),
  ('paul.t@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Paul T.',     'Paris 11e',   'dernier_rempart', 30),
  ('quentin.l@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Quentin L.',  'Paris 12e',   'renard_surfaces', 1),
  ('rania.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Rania M.',    'Paris 19e',   'muraille',        4),
  ('sacha.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sacha H.',    'Paris 20e',   'artificier',      8),
  ('tarek.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Tarek K.',    'Paris 13e',   'magicien',        11),
  ('unais.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Unaïs V.',    'Saint-Denis', 'dernier_rempart', 16),
  ('victor.s@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Victor S.',   'Paris 18e',   'renard_surfaces', 20),
  ('wassim.n@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Wassim N.',   'Paris 11e',   'muraille',        24),
  ('yasmine.a@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Yasmine A.',  'Paris 12e',   'artificier',      26),
  ('zakaria.d@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Zakaria D.',  'Paris 19e',   'magicien',        29);

-- 13 matchs (ids 1 à 13). Les dates sont relatives au jour où le seed est lancé.
-- Un match "passé" n'a pas de statut spécial : sa date est simplement dans le passé.
INSERT INTO rencontre (titre, description, lieu, latitude, longitude, date_heure, format, statut, organisateur_id) VALUES
  -- À venir, ouverts
  ('Le Five du Pont',            'Apporte un maillot clair.',        'Terrain de rue, Paris 11e',           48.8590, 2.3790, now() + interval '1 day',   'foot5',  'ouverte', 1),
  ('Foot du mercredi',           'Tous niveaux.',                    'Terrain synthétique Nord, Paris 19e', 48.8890, 2.3820, now() + interval '3 days',  'foot5',  'ouverte', 2),
  ('Five du soir',               'Après le boulot.',                 'City stade du Parc, Paris 20e',       48.8640, 2.4000, now() + interval '2 days',  'foot5',  'ouverte', 5),
  ('Match du dimanche',          'Chasubles fournies.',              'Terrain municipal, Paris 18e',        48.8920, 2.3480, now() + interval '4 days',  'foot7',  'ouverte', 4),
  ('Tournoi de quartier',        'Tournoi à 11.',                    'Stade municipal, Saint-Denis',        48.9360, 2.3540, now() + interval '9 days',  'foot11', 'ouverte', 1),
  ('Foot du jeudi',              'Ambiance détendue.',               'Terrain de la Butte, Paris 13e',      48.8280, 2.3660, now() + interval '5 days',  'foot5',  'ouverte', 6),
  -- À venir, annulés
  ('Five annulé (pluie)',        'Annulé à cause de la météo.',      'City stade du Canal, Paris 12e',      48.8400, 2.4000, now() + interval '2 days',  'foot5',  'annulee', 10),
  ('Foot du samedi',             'Annulé : terrain indisponible.',   'Terrain du Nord, Saint-Denis',        48.9300, 2.3600, now() + interval '6 days',  'foot7',  'annulee', 8),
  -- Passés
  ('Five de la semaine dernière','Déjà joué.',                       'Terrain de rue, Paris 20e',           48.8660, 2.3970, now() - interval '3 days',  'foot5',  'ouverte', 3),
  ('Match d''hier soir',         'Déjà joué.',                       'Terrain municipal, Paris 19e',        48.8870, 2.3790, now() - interval '1 day',   'foot7',  'ouverte', 12),
  ('Tournoi du mois dernier',    'Déjà joué.',                       'Stade municipal, Saint-Denis',        48.9360, 2.3540, now() - interval '20 days', 'foot11', 'ouverte', 1),
  -- Passé et annulé
  ('Five annulé du mois dernier','Annulé, jamais joué.',             'City stade du Parc, Paris 20e',       48.8640, 2.4000, now() - interval '10 days', 'foot5',  'annulee', 7),
  -- Match tout juste créé, seul l'organisateur est inscrit
  ('Five tout juste créé',       NULL,                               'Terrain de rue, Paris 11e',           48.8600, 2.3800, now() + interval '7 days',  'foot5',  'ouverte', 30);

-- Inscriptions : (numéro du match, numéro du joueur)
INSERT INTO inscription (rencontre_id, utilisateur_id) VALUES
  -- Match 1, Le Five du Pont : 7 sur 10
  (1, 1), (1, 2), (1, 3), (1, 5), (1, 6), (1, 9), (1, 10),
  -- Match 2, Foot du mercredi : 10 sur 10, complet
  (2, 2), (2, 4), (2, 6), (2, 7), (2, 8), (2, 11), (2, 12), (2, 13), (2, 14), (2, 15),
  -- Match 3, Five du soir : 8 sur 10
  (3, 5), (3, 1), (3, 2), (3, 3), (3, 9), (3, 10), (3, 16), (3, 17),
  -- Match 4, Match du dimanche : 12 sur 14
  (4, 4), (4, 1), (4, 2), (4, 5), (4, 7), (4, 8), (4, 10), (4, 11), (4, 12), (4, 18), (4, 19), (4, 20),
  -- Match 5, Tournoi de quartier : 20 sur 22
  (5, 1), (5, 2), (5, 3), (5, 4), (5, 5), (5, 6), (5, 7), (5, 8), (5, 9), (5, 10),
  (5, 11), (5, 12), (5, 13), (5, 14), (5, 15), (5, 16), (5, 17), (5, 18), (5, 19), (5, 20),
  -- Match 6, Foot du jeudi : 7 sur 10
  (6, 6), (6, 21), (6, 22), (6, 23), (6, 24), (6, 25), (6, 26),
  -- Match 7, annulé (pluie) : 4 inscrits
  (7, 10), (7, 1), (7, 5), (7, 9),
  -- Match 8, annulé (terrain indisponible) : 6 inscrits
  (8, 8), (8, 3), (8, 13), (8, 14), (8, 15), (8, 16),
  -- Match 9, passé : 10 sur 10
  (9, 3), (9, 1), (9, 2), (9, 4), (9, 5), (9, 6), (9, 9), (9, 10), (9, 17), (9, 18),
  -- Match 10, passé : 9 sur 14
  (10, 12), (10, 2), (10, 7), (10, 8), (10, 11), (10, 19), (10, 20), (10, 21), (10, 22),
  -- Match 11, passé : 18 sur 22
  (11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 6), (11, 7), (11, 8), (11, 9),
  (11, 10), (11, 11), (11, 12), (11, 13), (11, 14), (11, 15), (11, 16), (11, 17), (11, 18),
  -- Match 12, passé et annulé : 3 inscrits
  (12, 7), (12, 23), (12, 24),
  -- Match 13, tout juste créé : seulement l'organisateur
  (13, 30);