import * as inscriptionService from "../services/inscription.js";

export const addUserInMatch = async (req, res, next) => {
  try {
    await inscriptionService.addUserInMatch(req.user.id, req.params.id);
    res.status(201).json({ message: "Registration confirmed" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Already registered" });
    }
    next(err);
  }
};

export const getMatchsByUserId = async (req, res, next) => {
  try {
    const rencontres = await inscriptionService.getMatchsByUserId(req.user.id);
    res.status(200).json(rencontres);
  } catch (err) {
    next(err);
  }
};
