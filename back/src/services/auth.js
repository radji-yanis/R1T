import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as User from "../models/utilisateur.js";
import { ErrorHttp } from "../errors.js";

const HASH_COUNT = 10;
const SESSION_DURATION = "2h";

export async function register({
  email,
  pseudo,
  play_style,
  avatar_id,
  password,
}) {
  const userExist = await User.findByEmail(email);
  if (userExist) {
    throw new ErrorHttp(409, "Un compte existe déjà avec cet email");
  }

  const hashedPassword = await bcrypt.hash(password, HASH_COUNT);

  try {
    return await User.create({
      email,
      pseudo,
      play_style,
      avatar_id,
      hashedPassword,
    });
  } catch (error) {
    if (error.code === "23505") {
      throw new ErrorHttp(409, "Un compte existe déjà avec cet email");
    }
    throw error;
  }
}
