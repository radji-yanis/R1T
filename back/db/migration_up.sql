CREATE TYPE format_rencontre AS ENUM ('foot5', 'foot11');
CREATE TYPE statut_rencontre AS ENUM ('ouverte', 'annulee', 'complete');
CREATE TYPE poste_type AS ENUM ('gardien', 'defenseur', 'milieu', 'attaquant');

CREATE TABLE utilisateur (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  mot_de_passe_hash VARCHAR(255) NOT NULL,
  pseudo VARCHAR(50) NOT NULL,
  poste_prefere poste_type,
  date_creation TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE rencontre (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(100) NOT NULL,
  description TEXT,
  lieu VARCHAR(150) NOT NULL,
  date_heure TIMESTAMP NOT NULL,
  format format_rencontre NOT NULL,
  nb_places INTEGER NOT NULL,
  statut statut_rencontre NOT NULL DEFAULT 'ouverte',
  date_creation TIMESTAMP NOT NULL DEFAULT now(),
  organisateur_id INTEGER NOT NULL REFERENCES utilisateur(id)
);

CREATE TABLE inscription (
  utilisateur_id INTEGER NOT NULL REFERENCES utilisateur(id),
  rencontre_id INTEGER NOT NULL REFERENCES rencontre(id),
  date_inscription TIMESTAMP NOT NULL DEFAULT now(),
  liste_attente BOOLEAN DEFAULT false 
  PRIMARY KEY (utilisateur_id, rencontre_id)
);