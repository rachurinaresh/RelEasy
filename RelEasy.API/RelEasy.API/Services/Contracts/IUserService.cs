using RelEasy.API.Models.Request;
using RelEasy.Authentication.Models.DTO;

namespace RelEasy.API.Services.Contracts
{
    public interface IUserService
    {
        Task<TokenResponseDTO> Authorize(string azureAccessToken);

        Task<bool> RegisterUser(RegisterUserRequest registerUserRequest);
    }
}
