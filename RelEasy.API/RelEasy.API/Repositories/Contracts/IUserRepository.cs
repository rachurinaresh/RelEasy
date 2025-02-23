using RelEasy.API.Models.Request;
using RelEasy.Authentication.Models.DTO;

namespace RelEasy.API.Repositories.Contracts
{
    public interface IUserRepository
    {
        Task<UserDTO?> GetUserInfo(string email);

        Task<bool> RegisterUser(RegisterUserRequest registerUserRequest);
    }
}
