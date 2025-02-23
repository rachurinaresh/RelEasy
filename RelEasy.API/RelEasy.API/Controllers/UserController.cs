using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelEasy.API.Common;
using RelEasy.API.Constants;
using RelEasy.API.Models.Request;
using RelEasy.API.Services;
using RelEasy.API.Services.Contracts;
using RelEasy.Authentication.Models.DTO;

namespace RelEasy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : BaseController<UserController>
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) 
        {
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Authorize")]
        public async Task<IActionResult> Authorize(TokenValidationRequest tokenValidationRequest)
        {
            var response = await ProcessAsync<string, TokenResponseDTO, IUserService>(tokenValidationRequest.AzureAccessToken, _userService, MethodNames.Authorize);
            return Ok(new APIResponse<TokenResponseDTO>() { IsSuccess = true, Data = response });
        }

        [AllowAnonymous]
        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser(RegisterUserRequest registerUserRequest)
        {
            var response = await ProcessAsync<RegisterUserRequest, bool, IUserService>(registerUserRequest, _userService, MethodNames.RegisterUser);
            return Ok(new APIResponse<bool>() { IsSuccess = true, Data = response });
        }
    }
}
