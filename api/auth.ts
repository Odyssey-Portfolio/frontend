import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "@/_constants/Endpoints";
import { LoginFormFields, RegisterFormFields } from "@/_models/AuthFormFields";
import axiosInstance from "@/lib/axios";

export async function login(fields: LoginFormFields) {
  const response = await axiosInstance.post(LOGIN_ENDPOINT, fields);
  return response;
}

export async function register(fields: RegisterFormFields) {
  const response = await axiosInstance.post(REGISTER_ENDPOINT, fields);
  return response;
}
