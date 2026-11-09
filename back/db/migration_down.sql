DROP TABLE IF EXISTS inscription_rencontre;
DROP TABLE IF EXISTS rencontre;
DROP TABLE IF EXISTS utilisateur;

DROP TYPE IF EXISTS style_jeu;
DROP TYPE IF EXISTS statut_rencontre;
DROP TYPE IF EXISTS format_rencontre;

DROP INDEX IF EXISTS idx_rencontre_earth;
DROP EXTENSION IF EXISTS earthdistance;
DROP EXTENSION IF EXISTS cube;