import * as rencontreModel from "../models/rencontre.js";
import * as inscriptionModel from "../models/inscription.js";
import { httpError } from "../utils/httpError.js";

const validFormats = ["foot5", "foot7", "foot11"];
const validPeriod = ["jour", "semaine", "mois"];

const toISODate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// TODO : handle lat, lng & radius
export const getAll = async ({ format, period, lat, lng, radius }) => {
  if (format && !validFormats.includes(format)) {
    throw httpError(400, "Invalid match format");
  }

  let dateDebut = null;
  let dateFin = null;

  if (period) {
    if (!validPeriod.includes(period)) {
      throw httpError(400, "Invalid period");
    }

    const now = new Date();
    const debut = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const fin = new Date(debut);

    switch (period) {
      case "jour":
        break;
      case "semaine":
        const jour = (debut.getDay() + 6) % 7;
        debut.setDate(debut.getDate() - jour);
        fin.setTime(debut.getTime());
        fin.setDate(debut.getDate() + 6);
        break;
      case "mois":
        debut.setDate(1);
        fin.setFullYear(debut.getFullYear(), debut.getMonth() + 1, 0);
        break;
    }

    dateDebut = toISODate(debut);
    dateFin = toISODate(fin);
  }

  if (lat && !(Number.isFinite(lat) && lat >= -90 && lat <= 90))
    throw httpError(400, "Invalid latitude");

  if (lng && !(Number.isFinite(lng) && lng >= -180 && lng <= 180))
    throw httpError(400, "Invalid longitude");

  if (radius && !(Number.isFinite(radius) && radius >= 10 && lng <= 80))
    throw httpError(400, "Invalid radius");

  const rencontres = await rencontreModel.getAll(
    format,
    dateDebut,
    dateFin,
    lat,
    lng,
    radius,
  );

  return rencontres;
};

export const getById = async (id) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw httpError(400, "Invalid match id");
  }

  const rencontre = await rencontreModel.getById(id);
  if (!rencontre) {
    throw httpError(404, "Match not found");
  }

  const inscrits = await rencontreModel.getInscritsById(id);

  return { ...rencontre, inscrits };
};

export const cancelById = async (id) => {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw httpError(400, "Invalid match id");
  }

  const rencontre = await rencontreModel.cancelById(id);
  if (!rencontre) {
    throw httpError(404, "Match not found or already cancelled");
  }

  return rencontre;
};

export async function create(data) {
  const rencontre = await rencontreModel.create(data);
  await inscriptionModel.addUserInMatch(rencontre.organisateur_id, rencontre.id);
  return rencontre;
};

export const getOrganizedByUserId = async (userId) => {
  const OrganisedMatchs = await rencontreModel.getOrganizedByUserId(userId);
  return OrganisedMatchs;
};
