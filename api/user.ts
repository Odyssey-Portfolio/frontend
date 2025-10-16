import { UPDATE_USER_DETAILS_ENDPOINT } from "../_constants/Endpoints";
import { UpdateUserDetailsRequest } from "../_models/user/UpdateUserDetailsRequest";
import axiosInstance from "../lib/axios";

export async function updateUserDetails(request: UpdateUserDetailsRequest) {
  const response = await axiosInstance.post(
    UPDATE_USER_DETAILS_ENDPOINT,
    request
  );
  return response;
}
