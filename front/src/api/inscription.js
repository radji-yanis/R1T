import { call } from "./client";

export function addUserInMatch(matchId) {
  return call(`/inscription/${matchId}`, {
    method: "POST",
  });
}
