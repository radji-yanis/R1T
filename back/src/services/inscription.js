import * as inscriptionModel from "../models/inscription.js";
import * as rencontreModel from "../models/rencontre.js";

export const addUserInMatch = async (utilisateur_id, rencontre_id) => {
  if (!Number(utilisateur_id)) throw new Error("Invalid user ID");
  if (!Number(rencontre_id)) throw new Error("Invalid match ID");

  const rencontre = await rencontreModel.getById(rencontre_id);

  if (!rencontre) {
    throw new Error("Match not found");
  }
  if (rencontre.statut === "annulee") {
    throw new Error("Match has been cancelled");
  }
  if (rencontre.date_heure < new Date()) {
    throw new Error("Match is already over");
  }

  let availibility;
  if (rencontre.format === "foot5") {
    availibility = 10;
  } else if (rencontre.format === "foot7") {
    availibility = 14;
  } else {
    availibility = 22;
  }

  if (availibility <= Number(rencontre.nb_inscrits)) {
    throw new Error("Match is full");
  }

  await inscriptionModel.addUserInMatch(utilisateur_id, rencontre_id);
};

export const getMatchsByUserId = async (utilisateur_id) => {
  const rencontres = await inscriptionModel.getMatchsByUserId(utilisateur_id);
  return rencontres;
};
