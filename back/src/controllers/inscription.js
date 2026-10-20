import * as inscriptionService from "../services/inscription.js"

export const addUserInMatch = async (req, res, next) => {
    const { utilisateur_id } = req.params;
    const { id: rencontre_id } = req.params;
    try {
        const utilisateur = await inscriptionService.addUserInMatch(utilisateur_id, rencontre_id);
        res.status(201).json({ message: "Registration confirmed" });
        // res.status(200).json(utilisateur);
    } catch (err) {
        next(err);
    }
}