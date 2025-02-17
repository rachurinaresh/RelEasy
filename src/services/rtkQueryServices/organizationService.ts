import baseApi from "./baseApiService";
import { API_CONSTANTS } from "../../constants/apiConstants";
export const organizationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveOrganization: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.SAVE_ORGANIZATION}`,
        body: body,
        method: "POST",
      }),
    }),
  }),
});
export const { useLazySaveOrganizationQuery } = organizationApi;
