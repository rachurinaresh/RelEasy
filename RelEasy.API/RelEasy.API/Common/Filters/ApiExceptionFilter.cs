using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using RelEasy.API.Common.Models;

namespace RelEasy.API.Common.Filters
{
    public class ApiExceptionFilter : IAsyncExceptionFilter
    {
        private readonly ILogger<ApiExceptionFilter> _logger;

        public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        {
            _logger = logger;
        }

        public Task OnExceptionAsync(ExceptionContext context)
        {
            var exception = context.Exception;
            var customMessage = exception.ToString();
            var statusCode = HttpStatusCode.InternalServerError;

            do
            {
                if (exception is CustomException)
                {
                    statusCode = ((CustomException)exception).StatusCode;
                    customMessage = ((CustomException)exception).Message;
                    break;
                }
                exception = exception?.InnerException;
            } while (exception != null);

            var response = new APIResponse<object>()
            {
                IsSuccess = false,
                Message = customMessage
            };

            context.Result = new JsonResult(response)
            {
                StatusCode = (int)statusCode
            };

            _logger.LogError(context.Exception, customMessage);

            return Task.CompletedTask;
        }
    }
}
