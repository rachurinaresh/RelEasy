import baseApi from "./baseApiService";
import { API_CONSTANTS } from "../../constants/apiConstants";
export const pmtApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPMTMasterData: builder.query({
      query: (userId) => ({
        url: `${API_CONSTANTS.GET_PMT_MASTER_DATA}${userId}`,
        method: "GET",
      }),
    }),
    GetPMTConfigDetails: builder.query({
      query: (configId) => ({
        url: `${API_CONSTANTS.GET_PMT_CONFIG_DETAILS}${configId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    SavePMTConfigDetails: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.SAVE_PMT_CONFIG_DETAILS}`,
        body: body,
        method: "POST",
      }),
    }),
    GetPMTOrganizations: builder.query({
      query: (configId) => ({
        url: `${API_CONSTANTS.GET_PMT_ORGANIZATIONS}${configId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetPMTMasterDataQuery,
  useLazyGetPMTConfigDetailsQuery,
  useGetPMTOrganizationsQuery,
  useLazySavePMTConfigDetailsQuery,
} = pmtApi;
