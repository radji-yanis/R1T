import * as rencontreService from "../services/rencontre.js";

export const getById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const rencontre = await rencontreService.getById(id)
         res.status(200).json(rencontre);
    } catch (err) {
        next(err);
    }
}