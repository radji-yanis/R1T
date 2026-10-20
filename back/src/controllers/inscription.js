import * as inscriptionService from "../services/inscription.js"

export const addUserInMatch = async (req, res, next) => {
    const { utilisateur_id } = req.body;
    const { id: rencontre_id } = req.params;

    try {
        await inscriptionService.addUserInMatch(utilisateur_id, rencontre_id);
        res.status(201).json({ message: "Registration confirmed" });
    } catch (err) {
        if (err.code === "23505") {
            return res.status(409).json({ error: "Already registered" });
        }
        next(err);
    }
}