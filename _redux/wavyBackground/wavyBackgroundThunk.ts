// import { LoginFormFields } from "@/_models/AuthFormFields";
// import { login } from "@/api/auth";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async (fields: LoginFormFields, thunkAPI) => {
//     try {
//       const response = await login(fields);
//       return response;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );
