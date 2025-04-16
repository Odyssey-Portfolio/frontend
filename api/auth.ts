import { LOGIN_ENDPOINT } from "@/_constants/Endpoints";
import { LoginFormFields } from "@/_models/AuthFormFields";
import axios from "axios";

export async function login(fields: LoginFormFields) {
  const response = await axios.post(LOGIN_ENDPOINT, fields);
  return response;
}
