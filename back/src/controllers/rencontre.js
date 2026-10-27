import * as rencontreService from "../services/rencontre.js";

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
        const rencontres = await rencontreService.getAll(filters)
        res.status(200).json(rencontres);
    } catch (err) {
        next(err);
    }
}

export const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rencontre = await rencontreService.getById(id)
         res.status(200).json(rencontre);
    } catch (err) {
        next(err);
    }
}

export const cancelById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rencontre = await rencontreService.cancelById(id);
        res.status(200).json({ message: "Match cancelled successfully", rencontre });
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "Missing body" });
    }

    const { titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude } = req.body;

    if (!titre || !lieu || !format || !date_heure || !organisateur_id || !latitude || !longitude) {
        return res.status(400).json({ error: "Missing argument(s)" });
    }

    try {
        const rencontre = await rencontreService.create(titre, lieu, format, date_heure, description, organisateur_id, latitude, longitude);
        res.status(201).json({ message: "Match created successfully", rencontre });
    } catch (err) {
        next(err);
    }
};