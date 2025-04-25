import { LOGIN_ENDPOINT } from "@/_constants/Endpoints";
import { LoginFormFields } from "@/_models/AuthFormFields";
import axiosInstance from "@/lib/axios";

export async function login(fields: LoginFormFields) {
  const response = await axiosInstance.post(LOGIN_ENDPOINT, fields);
  return response;
}
