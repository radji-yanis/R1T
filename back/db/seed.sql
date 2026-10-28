-- Vide les tables et remet les id à 1 (à lancer uniquement sur ta base de test)
TRUNCATE inscription_rencontre, rencontre, utilisateur RESTART IDENTITY CASCADE;

-- 50 joueurs (ids 1 à 50, dans l'ordre). Mot de passe de tous les comptes : motdepasse123
INSERT INTO utilisateur (email, mot_de_passe_hash, pseudo, style, avatar_id) VALUES
  ('thomas.d@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Thomas D.',   'magicien',        3),
  ('sunny.n@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sunny N.',    'renard_surfaces', 7),
  ('mehdi.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Mehdi K.',    'muraille',        12),
  ('karim.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Karim B.',    'artificier',      18),
  ('sofiane.m@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sofiane M.',  'dernier_rempart', 22),
  ('leo.p@exemple.fr',      '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Léo P.',      'renard_surfaces', 5),
  ('maelle.r@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Maëlle R.',   'magicien',        27),
  ('amine.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Amine H.',    'muraille',        9),
  ('ines.t@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Inès T.',     'artificier',      30),
  ('lucas.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Lucas V.',    'dernier_rempart', 14),
  ('nadia.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nadia B.',    'magicien',        25),
  ('hugo.l@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Hugo L.',     'renard_surfaces', 1),
  ('yacine.a@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Yacine A.',   'muraille',        2),
  ('chloe.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Chloé M.',    'artificier',      4),
  ('nabil.s@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nabil S.',    'dernier_rempart', 6),
  ('camille.d@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Camille D.',  'magicien',        8),
  ('samir.o@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Samir O.',    'renard_surfaces', 10),
  ('jade.f@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Jade F.',     'artificier',      11),
  ('ethan.g@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Ethan G.',    'muraille',        13),
  ('lina.c@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Lina C.',     'magicien',        15),
  ('adam.r@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Adam R.',     'dernier_rempart', 16),
  ('manon.l@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Manon L.',    'renard_surfaces', 17),
  ('rayan.t@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Rayan T.',    'muraille',        19),
  ('zoe.p@exemple.fr',      '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Zoé P.',      'artificier',      20),
  ('ilyes.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Ilyes B.',    'magicien',        21),
  ('anais.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Anaïs K.',    'dernier_rempart', 23),
  ('bilal.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Bilal M.',    'renard_surfaces', 24),
  ('clara.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Clara H.',    'muraille',        26),
  ('dylan.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Dylan V.',    'artificier',      28),
  ('emma.s@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Emma S.',     'magicien',        29),
  ('farid.n@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Farid N.',    'dernier_rempart', 3),
  ('gaelle.a@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Gaëlle A.',   'renard_surfaces', 5),
  ('hamza.d@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Hamza D.',    'muraille',        7),
  ('imane.b@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Imane B.',    'artificier',      9),
  ('jules.r@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Jules R.',    'magicien',        12),
  ('kenza.o@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Kenza O.',    'dernier_rempart', 14),
  ('louis.f@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Louis F.',    'renard_surfaces', 18),
  ('melissa.g@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Mélissa G.',  'muraille',        22),
  ('nolan.c@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Nolan C.',    'artificier',      25),
  ('oceane.p@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Océane P.',   'magicien',        27),
  ('paul.t@exemple.fr',     '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Paul T.',     'dernier_rempart', 30),
  ('quentin.l@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Quentin L.',  'renard_surfaces', 1),
  ('rania.m@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Rania M.',    'muraille',        4),
  ('sacha.h@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Sacha H.',    'artificier',      8),
  ('tarek.k@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Tarek K.',    'magicien',        11),
  ('unais.v@exemple.fr',    '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Unaïs V.',    'dernier_rempart', 16),
  ('victor.s@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Victor S.',   'renard_surfaces', 20),
  ('wassim.n@exemple.fr',   '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Wassim N.',   'muraille',        24),
  ('yasmine.a@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Yasmine A.',  'artificier',      26),
  ('zakaria.d@exemple.fr',  '$2b$10$fDoWU9LiPbfx4PzrMhilselPnv1EF29OonVBCX3.RhEQaunt4028u', 'Zakaria D.',  'magicien',        29);

-- 28 matchs (ids 1 à 28). Dates relatives au jour du seed, avec des horaires fixes.
-- Format : date_trunc('day', now()) + interval 'N days H hours M minutes'
INSERT INTO rencontre (titre, description, lieu, latitude, longitude, date_heure, format, statut, organisateur_id) VALUES
  -- ids 1 à 13 : seed d'origine (Paris / Saint-Denis)
  -- À venir, ouverts
  ('Le Five du Pont',            'Apporte un maillot clair.',        'Terrain de rue, Paris 11e',           48.8590, 2.3790, date_trunc('day', now()) + interval '1 day 20 hours',            'foot5',  'ouverte', 1),
  ('Foot du mercredi',           'Tous niveaux.',                    'Terrain synthétique Nord, Paris 19e', 48.8890, 2.3820, date_trunc('day', now()) + interval '3 days 19 hours 30 minutes', 'foot5',  'ouverte', 2),
  ('Five du soir',               'Après le boulot.',                 'City stade du Parc, Paris 20e',       48.8640, 2.4000, date_trunc('day', now()) + interval '2 days 18 hours 45 minutes', 'foot5',  'ouverte', 5),
  ('Match du dimanche',          'Chasubles fournies.',              'Terrain municipal, Paris 18e',        48.8920, 2.3480, date_trunc('day', now()) + interval '4 days 10 hours',           'foot7',  'ouverte', 4),
  ('Tournoi de quartier',        'Tournoi à 11.',                    'Stade municipal, Saint-Denis',        48.9360, 2.3540, date_trunc('day', now()) + interval '9 days 14 hours',           'foot11', 'ouverte', 1),
  ('Foot du jeudi',              'Ambiance détendue.',               'Terrain de la Butte, Paris 13e',      48.8280, 2.3660, date_trunc('day', now()) + interval '5 days 20 hours 30 minutes', 'foot5',  'ouverte', 6),
  -- À venir, annulés
  ('Five annulé (pluie)',        'Annulé à cause de la météo.',      'City stade du Canal, Paris 12e',      48.8400, 2.4000, date_trunc('day', now()) + interval '2 days 19 hours',           'foot5',  'annulee', 10),
  ('Foot du samedi',             'Annulé : terrain indisponible.',   'Terrain du Nord, Saint-Denis',        48.9300, 2.3600, date_trunc('day', now()) + interval '6 days 16 hours',           'foot7',  'annulee', 8),
  -- Passés
  ('Five de la semaine dernière','Déjà joué.',                       'Terrain de rue, Paris 20e',           48.8660, 2.3970, date_trunc('day', now()) - interval '3 days' + interval '20 hours', 'foot5',  'ouverte', 3),
  ('Match d''hier soir',         'Déjà joué.',                       'Terrain municipal, Paris 19e',        48.8870, 2.3790, date_trunc('day', now()) - interval '1 day' + interval '21 hours',  'foot7',  'ouverte', 12),
  ('Tournoi du mois dernier',    'Déjà joué.',                       'Stade municipal, Saint-Denis',        48.9360, 2.3540, date_trunc('day', now()) - interval '20 days' + interval '13 hours', 'foot11', 'ouverte', 1),
  -- Passé et annulé
  ('Five annulé du mois dernier','Annulé, jamais joué.',             'City stade du Parc, Paris 20e',       48.8640, 2.4000, date_trunc('day', now()) - interval '10 days' + interval '19 hours', 'foot5',  'annulee', 7),
  -- Match tout juste créé
  ('Five tout juste créé',       NULL,                               'Terrain de rue, Paris 11e',           48.8600, 2.3800, date_trunc('day', now()) + interval '7 days 18 hours 30 minutes', 'foot5',  'ouverte', 30),

  -- ids 14 à 25 : à venir, ouverts
  -- Nantes
  ('Five de l''Île de Nantes',   'Tous niveaux, bonne ambiance.',    'Île de Nantes, Nantes',               47.2060, -1.5400, date_trunc('day', now()) + interval '2 days 20 hours 15 minutes', 'foot5',  'ouverte', 2),
  ('Foot au Parc de Procé',      'Match détendu en fin de journée.', 'Parc de Procé, Nantes',               47.2260, -1.5900, date_trunc('day', now()) + interval '5 days 18 hours',           'foot7',  'ouverte', 4),
  ('Tournoi de la Beaujoire',    'Tournoi à 11, inscription libre.', 'Quartier de la Beaujoire, Nantes',    47.2559, -1.5253, date_trunc('day', now()) + interval '12 days 9 hours 30 minutes', 'foot11', 'ouverte', 6),
  ('Five à Saint-Herblain',      'Apporte des baskets de salle.',    'Centre, Saint-Herblain',              47.2123, -1.6486, date_trunc('day', now()) + interval '3 days 19 hours',           'foot5',  'ouverte', 9),
  ('Foot du soir à Rezé',        'Après le boulot.',                 'Centre, Rezé',                        47.1820, -1.5480, date_trunc('day', now()) + interval '8 days 20 hours',           'foot7',  'ouverte', 11),
  -- Lyon
  ('Five de la Croix-Rousse',    'Terrain en hauteur, vue dégagée.', 'Croix-Rousse, Lyon 4e',               45.7740, 4.8320,  date_trunc('day', now()) + interval '1 day 19 hours 30 minutes', 'foot5',  'ouverte', 5),
  ('Match à Gerland',            'Chasubles fournies.',              'Quartier de Gerland, Lyon 7e',        45.7280, 4.8290,  date_trunc('day', now()) + interval '4 days 21 hours',           'foot7',  'ouverte', 1),
  ('Foot du dimanche à Villeurbanne', 'Tous niveaux.',               'Centre, Villeurbanne',                45.7667, 4.8800,  date_trunc('day', now()) + interval '6 days 11 hours',           'foot5',  'ouverte', 12),
  ('Tournoi de Décines',         'Tournoi à 11 près du stade.',      'Décines-Charpieu, Lyon Est',          45.7653, 4.9822,  date_trunc('day', now()) + interval '14 days 15 hours',          'foot11', 'ouverte', 8),
  -- Paris
  ('Five du Parc de la Villette','Match en plein air.',              'Parc de la Villette, Paris 19e',      48.8938, 2.3900,  date_trunc('day', now()) + interval '2 days 12 hours 30 minutes', 'foot5',  'ouverte', 3),
  ('Foot à Charléty',            'Ambiance sportive.',               'Stade Charléty, Paris 13e',           48.8185, 2.3465,  date_trunc('day', now()) + interval '7 days 20 hours',           'foot7',  'ouverte', 7),
  ('Match du Bois de Vincennes', 'Terrain herbeux, crampons conseillés.', 'Bois de Vincennes, Paris 12e',   48.8310, 2.4350,  date_trunc('day', now()) + interval '10 days 10 hours 30 minutes', 'foot11', 'ouverte', 10),

  -- ids 26 à 28 : passés
  ('Five de la Petite Hollande', 'Déjà joué.', 'Petite Hollande, Nantes',               47.2130, -1.5510, date_trunc('day', now()) - interval '5 days' + interval '19 hours 30 minutes',  'foot5',  'ouverte', 4),
  ('Match de Confluence',        'Déjà joué.', 'Quartier Confluence, Lyon 2e',          45.7430, 4.8190,  date_trunc('day', now()) - interval '8 days' + interval '20 hours',             'foot7',  'ouverte', 5),
  ('Tournoi des Buttes-Chaumont','Déjà joué.', 'Parc des Buttes-Chaumont, Paris 19e',   48.8800, 2.3830,  date_trunc('day', now()) - interval '15 days' + interval '14 hours',            'foot11', 'ouverte', 3);

-- Inscriptions : (numéro du match, numéro du joueur)
INSERT INTO inscription_rencontre (rencontre_id, utilisateur_id) VALUES
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
  (13, 30),
   -- Match 14, Five de l'Île de Nantes : 6 sur 10
  (14, 2), (14, 5), (14, 8), (14, 13), (14, 17), (14, 21),
  -- Match 15, Foot au Parc de Procé : 9 sur 14
  (15, 4), (15, 1), (15, 3), (15, 6), (15, 10), (15, 14), (15, 19), (15, 23), (15, 27),
  -- Match 16, Tournoi de la Beaujoire : 15 sur 22
  (16, 6), (16, 1), (16, 2), (16, 3), (16, 5), (16, 7), (16, 9), (16, 11),
  (16, 12), (16, 15), (16, 18), (16, 20), (16, 24), (16, 25), (16, 28),
  -- Match 17, Five à Saint-Herblain : 4 sur 10
  (17, 9), (17, 16), (17, 22), (17, 29),
  -- Match 18, Foot du soir à Rezé : 11 sur 14
  (18, 11), (18, 2), (18, 4), (18, 5), (18, 8), (18, 10), (18, 13), (18, 17), (18, 21), (18, 26), (18, 30),
  -- Match 19, Five de la Croix-Rousse : 10 sur 10, complet
  (19, 5), (19, 1), (19, 3), (19, 6), (19, 7), (19, 12), (19, 14), (19, 19), (19, 23), (19, 28),
  -- Match 20, Match à Gerland : 7 sur 14
  (20, 1), (20, 4), (20, 9), (20, 15), (20, 18), (20, 24), (20, 29),
  -- Match 21, Foot du dimanche à Villeurbanne : 5 sur 10
  (21, 12), (21, 2), (21, 16), (21, 20), (21, 25),
  -- Match 22, Tournoi de Décines : 12 sur 22
  (22, 8), (22, 1), (22, 3), (22, 6), (22, 10), (22, 11), (22, 13), (22, 17), (22, 21), (22, 22), (22, 27), (22, 30),
  -- Match 23, Five du Parc de la Villette : 8 sur 10
  (23, 3), (23, 5), (23, 7), (23, 14), (23, 19), (23, 23), (23, 26), (23, 29),
  -- Match 24, Foot à Charléty : 13 sur 14
  (24, 7), (24, 1), (24, 2), (24, 4), (24, 9), (24, 12), (24, 15), (24, 16), (24, 18), (24, 20), (24, 24), (24, 25), (24, 28),
  -- Match 25, Match du Bois de Vincennes : 17 sur 22
  (25, 10), (25, 1), (25, 2), (25, 3), (25, 4), (25, 5), (25, 6), (25, 8), (25, 9),
  (25, 11), (25, 13), (25, 14), (25, 17), (25, 19), (25, 21), (25, 22), (25, 26),
  -- Match 26, passé, Petite Hollande : 8 sur 10
  (26, 4), (26, 2), (26, 6), (26, 9), (26, 13), (26, 15), (26, 20), (26, 27),
  -- Match 27, passé, Confluence : 11 sur 14
  (27, 5), (27, 1), (27, 3), (27, 7), (27, 8), (27, 10), (27, 12), (27, 16), (27, 19), (27, 23), (27, 25),
  -- Match 28, passé, Buttes-Chaumont : 16 sur 22
  (28, 3), (28, 1), (28, 2), (28, 4), (28, 6), (28, 9), (28, 11), (28, 14),
  (28, 17), (28, 18), (28, 21), (28, 22), (28, 24), (28, 26), (28, 28), (28, 30);