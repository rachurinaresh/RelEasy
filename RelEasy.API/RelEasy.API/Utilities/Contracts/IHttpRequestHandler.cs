namespace RelEasy.API.Utilities.Contracts
{
    public interface IHttpRequestHandler
    {
        /// <summary>
        /// Used to get a new Http client with given token and acceptheaders
        /// </summary>
        /// <param name="token"></param>
        /// <param name="acceptHeaders"></param>
        /// <returns></returns>
        HttpClient GetHttpClient(string? token, string? acceptHeaders);

        /// <summary>
        /// Used to make a get call to the fetch the data from the url
        /// </summary>
        /// <param name="url"></param>
        /// <param name="token"></param>
        /// <param name="acceptHeaders"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> GetHttpRequest(string? url, string? token = null, string? acceptHeaders = null);

        /// <summary>
        /// Used to make a post call to the fetch the data from the url
        /// </summary>
        /// <param name="url"></param>
        /// <param name="requestJson"></param>
        /// <param name="token"></param>
        /// <param name="acceptHeaders"></param>
        /// <returns></returns>
        Task<HttpResponseMessage> PostHttpRequest(string? url, object requestJson, string? token = null, string? acceptHeaders = null);
    }
}
