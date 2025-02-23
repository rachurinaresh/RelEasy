using System.Net;

namespace RelEasy.API.Common.Models
{
    public class CustomException : Exception
    {
        public string CustomMessage { get; set; }

        public HttpStatusCode StatusCode { get; set; }

        public new Exception? InnerException { get; set; }

        public CustomException(string customMessage)
            : this(customMessage, HttpStatusCode.InternalServerError)
        {
        }

        public CustomException(string customMessage, HttpStatusCode statusCode)
            : base(customMessage)
        {
            CustomMessage = customMessage;
            StatusCode = statusCode;
        }

        public CustomException(string customMessage, Exception exception, HttpStatusCode statusCode = HttpStatusCode.InternalServerError)
            : base(customMessage, exception)
        {
            CustomMessage = customMessage;
            StatusCode = statusCode;
            InnerException = exception;
        }
    }
}
