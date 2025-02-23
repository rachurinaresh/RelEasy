import baseApi from "./baseApiService";
import { API_CONSTANTS } from "../../constants/apiConstants";
export const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    GetProjectsDetails: builder.query({
      query: (orgId) => ({
        url: `${API_CONSTANTS.GET_ORGANIZATION_PROJECTS}${orgId}`,
        method: "GET",
      }),
    }),
    GenerateProjectReleaseNotes: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.GENERATE_PROJECT_RELEASE_NOTES}`,
        body: body,
        method: "POST",
      }),
    }),
    GetProjectIssueTypes: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.GET_PROJECT_ISSUE_TYPES}`,
        body: body,
        method: "POST",
      }),
    }),

    GetProjectLabelValues: builder.query({
      query: (body) => ({
        url: `${API_CONSTANTS.GET_PROJECT_LABELS}`,
        body: body,
        method: "POST",
      }),
    }),
  }),
});
export const {
  useGetProjectsDetailsQuery,
  useGenerateProjectReleaseNotesQuery,
  useLazyGetProjectIssueTypesQuery,
  useGetProjectIssueTypesQuery,
  useGetProjectLabelValuesQuery,
  useLazyGenerateProjectReleaseNotesQuery,
} = projectsApi;
