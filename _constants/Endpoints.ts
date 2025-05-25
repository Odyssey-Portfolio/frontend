/*
  A GENTLE REMINDER: 
  - For testing purposes, please add the  ${LOCAL_SECURE_SERVER_URL} prefix before each endpoint.
    For example: /user/login -> `${LOCAL_SECURE_SERVER_URL}/user/login`
  - This overrides axiosInterceptor's default URL (now set to DEPLOYED_SERVER_URL).
  - After testing, DO NOT FORGET to remove ${LOCAL_SECURE_SERVER_URL}. Or else, JWT token HttpOnly cookie 
    will not be saved properly.  
  See lib/axios.ts (axiosInstance baseURL) for more details.
*/

export const LOCAL_SERVER_URL = "http://localhost:5018";
export const LOCAL_SECURE_SERVER_URL = "https://localhost:7206";
export const DEPLOYED_SERVER_URL =
  "https://odyssey-portfolio-backend.onrender.com";

export const BLOG_ENDPOINT = `/blog`;

/*AUTHENTICATION ENDPOINTS*/
export const LOGIN_ENDPOINT = `/user/login`;
export const REGISTER_ENDPOINT = `/user/register`;
export const LOGOUT_ENDPOINT = `/user/logout`;
