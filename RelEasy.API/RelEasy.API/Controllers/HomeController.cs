using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RelEasy.API.Common;
using RelEasy.API.Constants;
using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : BaseController<HomeController>
    {
        private readonly IHomeService _homeService;

        public HomeController(IHomeService homeService) 
        { 
            _homeService = homeService;
        }

        [AllowAnonymous]
        [HttpGet("IsAlive")]
        public IActionResult GetRes()
        {
            var response = Process<Object, string, IHomeService>(null, _homeService, MethodNames.GetString);
            return Ok(new APIResponse<string>() { IsSuccess = true, Data = response });
        }
    }
}
