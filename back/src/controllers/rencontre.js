import * as rencontreService from "../services/rencontre.js";
import { ErrorHttp } from "../errors.js";

export const getAll = async (req, res, next) => {
  const { period, format, lat, lng, radius } = req.query;

  const filters = {
    period: period || null,
    format: format || null,
    lat: lat !== undefined ? Number(lat) : null,
    lng: lng !== undefined ? Number(lng) : null,
    radius: radius !== undefined ? Number(radius) : null,
  };

  try {
    const rencontres = await rencontreService.getAll(filters);
    res.status(200).json(rencontres);
  } catch (err) {
    next(err);
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rencontre = await rencontreService.getById(id);
    res.status(200).json(rencontre);
  } catch (err) {
    next(err);
  }
};

export const cancelById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const rencontre = await rencontreService.cancelById(id);
    res
      .status(200)
      .json({ message: "Match cancelled successfully", rencontre });
  } catch (err) {
    next(err);
  }
};

const TITRE_MIN = 3;
const TITRE_MAX = 100;
const LIEU_MAX = 150;
const DESCRIPTION_MAX = 2000;
const FORMATS = ["foot5", "foot7", "foot11"];

function validateCreation({
  titre,
  lieu,
  format,
  date,
  time,
  description,
  latitude,
  longitude,
}) {
  const errors = {};

  if (typeof titre !== "string" && titre.trim() === "") {
    errors.titre = "Le titre est obligatoire";
  } else if (titre.trim().length < TITRE_MIN || titre.trim().length > TITRE_MAX) {
    errors.titre = `Le titre doit faire entre ${TITRE_MIN} et ${TITRE_MAX} caractères`;
  }

  if (!lieu || (typeof lieu !== "string" && lieu.trim() === "")) {
    errors.lieu = "Le lieu est obligatoire";
  } else if (lieu.trim().length > LIEU_MAX) {
    errors.lieu = `Le lieu ne doit pas dépasser ${LIEU_MAX} caractères`;
  }

  if (typeof format !== "string" && format.trim() === "") {
    errors.lieu = "Le format est obligatoire";
  } else if (!FORMATS.includes(format.trim().toLowerCase())) {
    errors.format = `Le format doit être : ${FORMATS.join(", ")}`;
  }

  const formatedDate = new Date(date);
  if (formatedDate.toString() === 'Invalid Date') {
    errors.date = "La date est obligatoire";
  } else if (formatedDate <= new Date()) {
    errors.date = "La date est passée";
  }

  const date_heure = new Date(`${date} ${time}`);
  if (date_heure.toString() === 'Invalid Date') {
    errors.time = "L'heure est obligatoire";
  } else if (date_heure <= new Date()) {
    errors.time = "La date est passée";
  }

  if (description !== undefined && description !== null) {
    if (typeof description !== "string") {
      errors.description = "La description n'a pas un format valide";
    } else if (description.trim().length > DESCRIPTION_MAX) {
      errors.description = `La description ne doit pas dépasser ${DESCRIPTION_MAX} caractères`;
    }
  }

  const lat = Number(latitude);
  if (!Number.isFinite(lat) || lat < -90 || lat > 90) {
    errors.lieu = "La latitude doit être comprise entre -90 et 90";
  }

  const lng = Number(longitude);
  if (!Number.isFinite(lng) || lng < -180 || lng > 180) {
    errors.lieu = "La longitude doit être comprise entre -180 et 180";
  }

  console.log(errors);
  return errors;
}

export async function create(req, res) {
  const body = req.body ?? {};
  const errors = validateCreation(body);
  if (Object.keys(errors).length > 0) {
    throw new ErrorHttp(422, "Données invalides", errors);
  }

  const rencontre = await rencontreService.create({
    titre: body.titre.trim(),
    lieu: body.lieu.trim(),
    format: body.format.trim().toLowerCase(),
    date_heure: new Date(`${body.date} ${body.time}`),
    description: body.description?.trim() || null,
    organisateur_id: body.organisateur_id,
    latitude: Number(body.latitude),
    longitude: Number(body.longitude),
  });
  res.status(201).json({ rencontre });
}

export const getOrganizedByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const organizedMatches = await rencontreService.getOrganizedByUserId(id);

    res.status(200).json(organizedMatches);
  } catch (error) {
    next(error);
  }
};
