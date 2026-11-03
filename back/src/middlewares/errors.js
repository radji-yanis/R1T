import { ErrorHttp } from "../errors.js";

export function handleErrors(err, req, res, next) {
  if (err instanceof ErrorHttp) {
    return res
      .status(err.status)
      .json({ message: err.message, erreurs: err.details });
  }

  if (err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ message: "Le corps de la requête doit être du JSON valide" });
  }
  console.error(err);
  res.status(500).json({ message: "Erreur interne du serveur" });
}
