import * as utilisateurService from "../services/utilisateur.js"

export const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const utilisateur = await utilisateurService.getById(id);
        res.status(200).json(utilisateur);
    } catch (err) {
        next(err);
    }
}