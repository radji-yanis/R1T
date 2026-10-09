CREATE TYPE format_rencontre AS ENUM ('foot5', 'foot7', 'foot11');
CREATE TYPE statut_rencontre AS ENUM ('ouverte', 'annulee');
CREATE TYPE style_jeu AS ENUM ('renard_surfaces', 'magicien','muraille','dernier_rempart','artificier');


CREATE TABLE utilisateur (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe_hash VARCHAR(255) NOT NULL,
  pseudo VARCHAR(50) NOT NULL,
  ville VARCHAR(100),
  style style_jeu ,
  avatar_id INTEGER NOT NULL DEFAULT 1 CHECK (avatar_id BETWEEN 1 AND 30),
  date_creation TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE rencontre (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(100) NOT NULL,
  description TEXT,
  lieu VARCHAR(150) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  date_heure TIMESTAMP NOT NULL,
  format format_rencontre NOT NULL,
  statut statut_rencontre NOT NULL DEFAULT 'ouverte',
  date_creation TIMESTAMP NOT NULL DEFAULT now(),
  organisateur_id INTEGER NOT NULL REFERENCES utilisateur(id)
);

CREATE TABLE inscription (
  utilisateur_id INTEGER NOT NULL REFERENCES utilisateur(id) ON DELETE CASCADE,
  rencontre_id INTEGER NOT NULL REFERENCES rencontre(id) ON DELETE CASCADE,
  date_inscription TIMESTAMP NOT NULL DEFAULT now(),
  PRIMARY KEY (utilisateur_id, rencontre_id)
);

