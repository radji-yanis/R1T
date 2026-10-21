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

export const updateById = async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({ error: "Missing body" });
    }
    const {id} = req.params;
    const { pseudo, email, style, avatar_id} = req.body;
    if (!pseudo|| !email || !style || !avatar_id) {
        return res.status(400).json({ error: "Missing argument(s)" });
    }
    try {
        const utilisateur = await utilisateurService.updateById(id,pseudo, email, style, avatar_id );
        res.status(200).json(utilisateur);
    } catch (err) {
        next(err);
    }
}