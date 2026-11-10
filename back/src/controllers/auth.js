import * as authService from "../services/auth.js";
import { ErrorHttp } from "../errors.js";

const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const MAX_AGE = 2 * 60 * 60 * 1000;
const VALID_STYLES = [
  "renard_surfaces",
  "magicien",
  "muraille",
  "dernier_rempart",
  "artificier",
];

function validateRegistration({
  email,
  pseudo,
  play_style,
  avatar_id,
  password,
}) {
  const errors = {};
  if (typeof pseudo !== "string" || pseudo.trim() === "") {
    errors.pseudo = "Le pseudo est obligatoire";
  } else if (pseudo.trim().length > 20) {
    errors.pseudo = "Le pseudo fait au maximum 20 caractères";
  }
  if (typeof email !== "string" || !EMAIL_FORMAT.test(email.trim())) {
    errors.email = "L'email n'a pas un format valide";
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Le mot de passe fait au moins ${MIN_PASSWORD_LENGTH} caractères`;
  }
  if (typeof play_style !== "string" || !VALID_STYLES.includes(play_style)) {
    errors.play_style = "Le style de jeu n'est pas valide";
  }
  const avatarId = Number(avatar_id);
  if (typeof avatarId !== "number" || avatarId < 1 || avatarId > 30) {
    errors.avatarId = "L'avatar n'est pas valide";
  }
  return errors;
}

const normalizeEmail = (email) => email.trim().toLowerCase();

export async function registration(req, res) {
  const body = req.body ?? {};
  const errors = validateRegistration(body);
  if (Object.keys(errors).length > 0) {
    throw new ErrorHttp(422, "Données invalides", errors);
  }

  const user = await authService.register({
    pseudo: body.pseudo.trim(),
    email: normalizeEmail(body.email),
    password: body.password,
    play_style: body.play_style,
    avatar_id: Number(body.avatar_id),
  });
  res.status(201).json({ user });
}
function validateConnection({ email, password }) {
  const errors = {};
  if (typeof email !== "string" || !EMAIL_FORMAT.test(email.trim())) {
    errors.email = "L'email n'a pas un format valide";
  }
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Le mot de passe fait au moins ${MIN_PASSWORD_LENGTH} caractères`;
  }

  return errors;
}

export async function connection(req, res) {
  const body = req.body ?? {};
  const errors = validateConnection(body);
  if (Object.keys(errors).length > 0) {
    throw new ErrorHttp(422, "Données invalides", errors);
  }

  const [user, token] = await authService.connect({
    email: normalizeEmail(body.email),
    password: body.password,
  });

  res.cookie("token", token, {
    maxAge: MAX_AGE,
    httpOnly: true,
    // secure: true,
    sameSite: "lax",
  });

  res.status(200).json({ user });
}

export async function me(req, res) {
  const user = await authService.profile(req.user.id);
  res.json({ user });
}

export async function disconnect(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(204).end();
}
