import { LOGGED_IN_USER } from "@/_constants/Auth";
import { LoggedInUser } from "@/_models/LoggedInUser";
import { deserialize } from "./JsonUtils";

export function getLoggedInUser() {
  const loggedInUserFromSessionStorage = sessionStorage.getItem(LOGGED_IN_USER);
  if (!loggedInUserFromSessionStorage) return;
  return deserialize<LoggedInUser>(loggedInUserFromSessionStorage);
}
