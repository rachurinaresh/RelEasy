using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Services
{
    public class HomeService : IHomeService
    {
        public string GetString()
        {
            return "Home Service";
        }
    }
}
