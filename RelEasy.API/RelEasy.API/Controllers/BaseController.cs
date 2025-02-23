using Microsoft.AspNetCore.Mvc;

namespace RelEasy.API.Controllers
{
    public class BaseController<T> : ControllerBase where T : BaseController<T>
    {
        public TResponse Process<TRequest, TResponse, TService>(TRequest? request, TService service, string methodName) where TService : class
        {
            if (service == null)
            {
                throw new ArgumentNullException(nameof(service));
            }
            else
            {
                var method = typeof(TService).GetMethod(methodName);
                TResponse response;
                if (method == null)
                {
                    throw new Exception($"{service} service, MethodName should be valid; MethodName: {methodName}");
                }

                if (request == null)
                {
                    response = (TResponse)method.Invoke(service, null);
                }
                else
                {
                    response = (TResponse)method.Invoke(service, new object[] { request });
                }
                
                return response;
            }
        }

        public async Task<TResponse> ProcessAsync<TRequest, TResponse, TService>(TRequest? request, TService service, string methodName) where TService : class
        {
            if (service is null)
            {
                throw new ArgumentNullException(nameof(service));
            }
            else
            {
                var method = typeof(TService).GetMethod(methodName);
                TResponse response;
                if (method == null)
                {
                    throw new Exception($"{service} service,MethodName should be valid; MethodName: {methodName}");
                }

                if (request == null)
                {
                    response = await (Task<TResponse>)method.Invoke(service, null);
                }
                else
                {
                    response = await (Task<TResponse>)method.Invoke(service, new object[] { request });
                }
                return response;
            }
        }
    }
}
