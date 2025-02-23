import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { API_CONSTANTS } from "../../constants/apiConstants";
import { UserService } from "../UserService";

const baseQuery = fetchBaseQuery({
  baseUrl: API_CONSTANTS.BASE_URL,
  prepareHeaders(headers, api) {
    const token = UserService.accessToken;
    if (token && !headers.has("Authorization")) {
      headers.append("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    (result.error && result.error.status === 401) ||
    (UserService.getClaims?.exp &&
      Date.now() >= UserService.getClaims?.exp * 1000)
  ) {
    UserService.logOut();
  }
  return result;
};

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
export default baseApi;
