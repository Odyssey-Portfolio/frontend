import {
  UPDATE_USER_AVATAR_ENDPOINT,
  UPDATE_USER_DETAILS_ENDPOINT,
} from "../_constants/Endpoints";
import { UpdateUserAvatarRequest } from "../_models/user/UpdateUserAvatarRequest";
import { UpdateUserDetailsRequest } from "../_models/user/UpdateUserDetailsRequest";
import axiosInstance from "../lib/axios";
import { toFormData } from "../utils/FormUtils";

export async function updateUserDetails(request: UpdateUserDetailsRequest) {
  const response = await axiosInstance.post(
    UPDATE_USER_DETAILS_ENDPOINT,
    request
  );
  return response;
}

export async function updateUserAvatar(request: UpdateUserAvatarRequest) {
  const userAvatarFormData = toFormData(request);
  const response = await axiosInstance.post(
    UPDATE_USER_AVATAR_ENDPOINT,
    userAvatarFormData
  );
  return response;
}
