using RelEasy.API.Constants;
using RelEasy.API.Utilities.Contracts;
using System.Net.Http.Headers;

namespace RelEasy.API.Utilities
{
    public class HttpRequestHandler : IHttpRequestHandler
    {
        public HttpClient GetHttpClient(string? token, string? acceptHeaders)
        {
            HttpClient httpClient = new();

            if (!string.IsNullOrWhiteSpace(token))
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(CommonConstants.Bearer, token);
            }

            if (!string.IsNullOrWhiteSpace(acceptHeaders))
            {
                httpClient.DefaultRequestHeaders.Add(CommonConstants.Accept, acceptHeaders);
            }

            return httpClient;
        }

        public async Task<HttpResponseMessage> GetHttpRequest(string? url, string? token = null, string? acceptHeaders = null)
        {
            using HttpClient httpClient = GetHttpClient(token, acceptHeaders);
            return await httpClient.GetAsync(url);
        }

        public async Task<HttpResponseMessage> PostHttpRequest(string? url, object requestJson, string? token = null, string? acceptHeaders = null)
        {
            using HttpClient httpClient = GetHttpClient(token, acceptHeaders);
            return await httpClient.PostAsJsonAsync(url, requestJson);
        }
    }
}
