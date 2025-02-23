using Microsoft.Extensions.Options;
using RelEasy.API.Common.Models;
using RelEasy.API.Constants;
using RelEasy.API.Models.Request;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Services.Contracts;
using RelEasy.Authentication.Common;
using RelEasy.Authentication.Models.DTO;
using RelEasy.Authentication.Utilities;
using System.IdentityModel.Tokens.Jwt;

namespace RelEasy.API.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtSecurityTokenSettings _jwtSettings;

        public UserService(IUserRepository userRepository, IOptions<JwtSecurityTokenSettings> jwtSecuritySettings)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSecuritySettings.Value;
        }

        public async Task<bool> RegisterUser(RegisterUserRequest registerUserRequest)
        {
            return await _userRepository.RegisterUser(registerUserRequest);
        }

        public async Task<TokenResponseDTO> Authorize(string token)
        {
            var jwtToken = new JwtSecurityToken(token);
            string email = jwtToken?.Claims?.FirstOrDefault(x => x.Type == "unique_name" || x.Type == "preferred_username" || x.Type == "email")?.Value;
            if (string.IsNullOrEmpty(email))
            {
                throw new CustomException(CommonConstants.InvalidToken);
            }

            var user = await _userRepository.GetUserInfo(email);
            if (user == null)
            {
                throw new KeyNotFoundException(string.Format(CommonConstants.UserNotFoundWithEmail, email));
            }
            return GetJwtToken(user);
        }

        private TokenResponseDTO GetJwtToken(UserDTO? userDTO)
        {
            var Jti = Guid.NewGuid().ToString();

            var responseDTO = new UserClaimsDTO()
            {
                Email = userDTO.Email,
                UserId = userDTO.Id,
                Name = userDTO.UserName
            };

            var token = JwtTokenHelper.GenerateJWTToken(responseDTO, Jti, _jwtSettings);
            var loginResponse = new TokenResponseDTO
            {
                Token = token,
                RefreshToken = null
            };
            return loginResponse;
        }
    }
}
