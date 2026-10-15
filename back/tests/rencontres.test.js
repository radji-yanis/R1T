import test from "node:test";
import assert from "node:assert/strict";

test("La recherche refuse un format de match invalide", async () => {
  const response = await fetch(
    "http://localhost:3000/api/rencontres?format=football99",
  );

  const data = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(data, {
    error: "Invalid match format",
  });
});

test("La recherche refuse une date invalide", async () => {
  const response = await fetch(
    "http://localhost:3000/api/rencontres?dateDebut=2026-02-30",
  );

  const data = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(data, {
    error: "Invalid date format",
  });
});

test("La recherche refuse un identifiant de rencontre invalide", async () => {
  const response = await fetch("http://localhost:3000/api/rencontres/1.5");

  const data = await response.json();

  assert.equal(response.status, 400);
  assert.deepEqual(data, {
    error: "Invalid match ID",
  });
});

test("La recherche retourne une liste de rencontres", async () => {
  const response = await fetch(
    "http://localhost:3000/api/rencontres?format=foot5",
  );

  const data = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(data));

  for (const match of data) {
    assert.equal(match.format, "foot5");
    assert.ok("nb_inscrits" in match);
  }
});

test("La recherche respecte les dates de début et de fin", async () => {
  const startDate = "2026-10-01";
  const endDate = "2026-10-31";

  const response = await fetch(
    `http://localhost:3000/api/rencontres?dateDebut=${startDate}&dateFin=${endDate}`,
  );

  const data = await response.json();

  assert.equal(response.status, 200);
  assert.ok(Array.isArray(data));

  for (const match of data) {
    const matchDate = match.date_heure.slice(0, 10);

    assert.ok(matchDate >= startDate);
    assert.ok(matchDate <= endDate);
  }
});
