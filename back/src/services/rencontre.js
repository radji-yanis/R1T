import * as rencontreModel from "../models/rencontre.js";
import { httpError } from "../utils/httpError.js";

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

 export const create = async (titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude) => {
    const lat = Number(latitude);
    const lng = Number(longitude);
    const validFormats = ["foot5", "foot7", "foot11"];

    if (titre.trim().length < 3) {
        throw httpError(400, "Title is required and must be at least 3 characters long.");
    }

    if (!lieu.trim()) {
        throw httpError(400, "Location is required.");
    }

    if (!validFormats.includes(format)) {
        throw httpError(400, "Invalid format. Accepted values: 5v5, 7v7, 11v11.");
    }

    if (Number.isNaN(Date.parse(date_heure))) {
        throw httpError(400, "Invalid date or time.");
    }

    if (!Number.isInteger(Number(organisateur_id))) {
        throw httpError(400, "Organizer ID must be a valid integer.");
    }

    if (Number.isNaN(lat) || lat < -90 || lat > 90) {
        throw httpError(400, "Invalid latitude. Must be between -90 and 90.");
    }

    if (Number.isNaN(lng) || lng < -180 || lng > 180) {
        throw httpError(400, "Invalid longitude. Must be between -180 and 180.");
    }

    return rencontreModel.create(
        titre.trim(),
        lieu.trim(),
        format,
        date_heure,
        description || null,
        organisateur_id,
        lat,
        lng,
    );
};