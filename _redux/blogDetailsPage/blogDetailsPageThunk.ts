// export const blogDetailsPageThunk = createAsyncThunk(
//   "blogDetailsPage/get",
//   async (params: BlogDetailsPageParams, thunkAPI) => {
//     try {
//       const response = await blogDetailsPage(params);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Something went wrong"
//       );
//     }
//   }
// );
