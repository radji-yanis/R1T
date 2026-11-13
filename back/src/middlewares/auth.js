import { ErrorHttp } from "../errors.js";
import jwt from "jsonwebtoken";

export function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    throw new ErrorHttp(401, "Connexion requise");
  }
  try {
    const content = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: content.sub };
    next();
  } catch {
    throw new ErrorHttp(401, "Session expiré ou invalide");
  }
}
