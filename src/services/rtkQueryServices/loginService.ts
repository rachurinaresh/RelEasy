import baseApi from "./baseApiService";
import { API_CONSTANTS } from "../../constants/apiConstants";
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetToken: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.AUTHORIZE}`,
        method: "POST",
        body: body,
      }),
    }),
    RegisterUser: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.REGISTER}`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});
export const { useLazyGetTokenQuery, useLazyRegisterUserQuery } = projectsApi;
