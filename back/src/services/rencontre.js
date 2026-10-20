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