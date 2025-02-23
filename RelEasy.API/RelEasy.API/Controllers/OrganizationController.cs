using Microsoft.AspNetCore.Mvc;
using RelEasy.API.Common;
using RelEasy.API.Constants;
using RelEasy.API.Models.Request;
using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : BaseController<OrganizationController>
    {
        private readonly IOrganizationService _organizationService;
        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        [HttpPost("SaveOrganization")]
        public async Task<IActionResult> SaveOrganization(SaveOrganizationRequest saveOrganizationRequest)
        {
            var response = await ProcessAsync<SaveOrganizationRequest, bool, IOrganizationService>(saveOrganizationRequest, _organizationService, MethodNames.SaveOrganization);
            return Ok(new APIResponse<bool>() { IsSuccess = true, Data = response });
        }
    }
}
