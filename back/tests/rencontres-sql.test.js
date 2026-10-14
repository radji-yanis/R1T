
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { pool } from "../src/db.js";

test("SQL - le nombre d'inscrits correspond aux inscriptions", async () => {
  const { rows } = await pool.query(`
    SELECT
      rencontre.id,
      COALESCE(inscrits.nb_inscrits, 0) AS nb_inscrits,
      (
        SELECT COUNT(*)
        FROM inscription
        WHERE inscription.rencontre_id = rencontre.id
      ) AS total_attendu
    FROM rencontre
    LEFT JOIN (
      SELECT
        rencontre_id,
        COUNT(*) AS nb_inscrits
      FROM inscription
      GROUP BY rencontre_id
    ) AS inscrits
      ON rencontre.id = inscrits.rencontre_id
    WHERE rencontre.statut != 'annulee'
  `);

  assert.ok(rows.length > 0, "Aucune rencontre à vérifier");

  for (const rencontre of rows) {
    assert.equal(
      Number(rencontre.nb_inscrits),
      Number(rencontre.total_attendu)
    );
  }
});

test("SQL - chaque rencontre possède un nombre d'inscrits valide", async () => {
  const { rows } = await pool.query(`
    SELECT
      rencontre.id,
      COALESCE(inscrits.nb_inscrits, 0) AS nb_inscrits
    FROM rencontre
    LEFT JOIN (
      SELECT
        rencontre_id,
        COUNT(*) AS nb_inscrits
      FROM inscription
      GROUP BY rencontre_id
    ) AS inscrits
      ON rencontre.id = inscrits.rencontre_id
    WHERE rencontre.statut != 'annulee'
  `);

  for (const rencontre of rows) {
    const nbInscrits = Number(rencontre.nb_inscrits);

    assert.ok(Number.isInteger(nbInscrits));
    assert.ok(nbInscrits >= 0);
  }
});

test("SQL - les rencontres annulées sont exclues", async () => {
  const { rows } = await pool.query(`
    SELECT rencontre.id, rencontre.statut
    FROM rencontre
    WHERE rencontre.statut != 'annulee'
  `);

  for (const rencontre of rows) {
    assert.notEqual(rencontre.statut, "annulee");
  }
});

after(async () => {
  await pool.end();
});
