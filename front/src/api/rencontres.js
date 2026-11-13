const BASE_URL = "http://localhost:3000/api";

import { call } from "./client";

export async function getRencontres(filters) {
  let params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      params.append(key, value);
    }
  });

  const response = await fetch(`${BASE_URL}/rencontres/?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return response.json();
}

export async function getRencontreById(id) {
  const response = await fetch(`${BASE_URL}/rencontres/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP ${response.status}`);
  }

  return response.json();
}

export function createRencontre(data) {
  return call("/rencontres/create/", { method: "POST", body: JSON.stringify(data) });
}

export async function getOrganizedMatches(userId) {
  const response = await fetch(`${BASE_URL}/rencontres/organisateur/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}

export async function getRegisteredMatches(userId) {
  const response = await fetch(`${BASE_URL}/inscription/utilisateur/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  return response.json();
}
