import * as rencontreModel from "../models/rencontre.js";

export const getById = async (id) => {
    if (!Number(id) || id <= 0) {
        throw new Error("Invalid match ID");
    }

    const rencontre = await rencontreModel.getById(id);
    const inscrits = await rencontreModel.getInscritsById(id);

    if (!rencontre) {
        throw new Error("Match not found");
    }  
    if (!inscrits) {
        inscrits = [];
    }  

    return { ...rencontre, inscrits };
}