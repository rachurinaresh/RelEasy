using Microsoft.AspNetCore.Mvc;
using RelEasy.API.Common;
using RelEasy.API.Constants;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;
using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PMTController : BaseController<PMTController>
    {
        private readonly IPMTService _pmtService;

        public PMTController(IPMTService pmtService)
        {
            _pmtService = pmtService;
        }

        [HttpGet("GetPMTMasterData")]
        public async Task<IActionResult> GetPMTMasterData(string userId)
        {
            var response = await ProcessAsync<string, List<GetPMTMasterDataResponse>, IPMTService>(userId, _pmtService, MethodNames.GetPMTMasterData);
            return Ok(new APIResponse<List<GetPMTMasterDataResponse>>() { IsSuccess = true, Data = response });
        }

        [HttpGet("GetPMTConfigDetails")]
        public async Task<IActionResult> GetPMTConfigDetails(string pmtConfigId)
        {
            var response = await ProcessAsync<string, GetPMTConfigDetailsResponse, IPMTService>(pmtConfigId, _pmtService, MethodNames.GetPMTConfigDetails);
            return Ok(new APIResponse<GetPMTConfigDetailsResponse>() { IsSuccess = true, Data = response });
        }

        [HttpPost("SavePMTConfigDetails")]
        public async Task<IActionResult> SavePMTConfigDetails(PMTConfigDetailsRequest pmtConfigDetailsRequest)
        {
            var response = await ProcessAsync<PMTConfigDetailsRequest, bool, IPMTService>(pmtConfigDetailsRequest, _pmtService, MethodNames.SavePMTConfigDetails);
            return Ok(new APIResponse<bool>() { IsSuccess = true, Data = response });
        }

        [HttpGet("GetPMTOrganizations")]
        public async Task<IActionResult> GetPMTOrganizations(string pmtConfigId)
        {
            var response = await ProcessAsync<string, List<OrganizationDetailsResponse>, IPMTService>(pmtConfigId, _pmtService, MethodNames.GetPMTOrganizations);
            return Ok(new APIResponse<List<OrganizationDetailsResponse>>() { IsSuccess = true, Data = response });
        }


    }
}
