import { call } from "./client";

export function register(userData) {
  return call("/auth/registration", { method: "POST", body: JSON.stringify(userData) });
}
export function connect(userData) {
  return call("/auth/connection", { method: "POST", body: JSON.stringify(userData) });
}
export function disconnect() {
  return call("/auth/disconnect", { method: "POST" });
}
export function getMe() {
  return call("/auth/me", { method: "GET" });
}