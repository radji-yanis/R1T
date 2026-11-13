import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as User from "../models/utilisateur.js";
import { ErrorHttp } from "../errors.js";

const HASH_COUNT = 10;
const SESSION_DURATION = "2h";

export async function register({
  email,
  pseudo,
  password,
}) {
  const pseudoExist = await User.findByPseudo(pseudo);
  if (pseudoExist) {
    throw new ErrorHttp(409, "Un compte existe déjà avec ce pseudo", {
      pseudo: "Un compte existe déjà avec ce pseudo"
    });
  }

  const userExist = await User.findByEmail(email);
  if (userExist) {
    throw new ErrorHttp(409, "Un compte existe déjà avec cet email", {
      email: "Un compte existe déjà avec cet email"
    });
  }

  const hashedPassword = await bcrypt.hash(password, HASH_COUNT);

  try {
    return await User.create({
      email,
      pseudo,
      hashedPassword,
    });
  } catch (error) {
    if (error.code === "23505") {
      throw new ErrorHttp(409, "Un compte existe déjà avec cet email", {
        email: "Un compte existe déjà avec cet email"
      });
    }
    throw error;
  }
}

export async function connect({ email, password }) {
  const user = await User.findByEmail(email);
  if (!user) {
    throw new ErrorHttp(401, "Aucun compte n'est associé a cet email", {
      email: "Aucun compte n'est associé à cet email"
    });
  }
  const matchingPassword = await bcrypt.compare(
    password,
    user.mot_de_passe_hash,
  );
  if (!matchingPassword) {
    throw new ErrorHttp(401, "Le mot de passe est incorrect", {
      password: "Mot de passe incorrect"
    });
  }
  const token = jwt.sign(
    {
      sub: user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" },
  );
  const { mot_de_passe_hash, ...publicUser } = user;
  return [publicUser, token];
}

export async function profile(id) {
  const user = await User.findById(id);
  if (!user) {
    throw new ErrorHttp(401, "Session invalide");
  }
  return user;
}
