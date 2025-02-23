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
    public class ProjectController : BaseController<ProjectController>
    {
        private readonly IPMTProjectService _pmtProjectService;
        public ProjectController(IPMTProjectService pmtProjectService)
        {
            _pmtProjectService = pmtProjectService;
        }

        [HttpGet("GetAllPMTProjects")]
        public async Task<IActionResult> GetAllPMTProjects(string organizationId)
        {
            var response = await ProcessAsync<string, List<ProjectDetailsResponse>, IPMTProjectService>(organizationId, _pmtProjectService, MethodNames.GetAllPMTProjects);
            return Ok(new APIResponse<List<ProjectDetailsResponse>>() { IsSuccess = true, Data = response });
        }

        [HttpPost("GetProjectIssues")]
        public async Task<IActionResult> GetProjectIssues(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            var response = await ProcessAsync<GetProjectIssuesRequest, List<IssueDetailsResponse>, IPMTProjectService>(getProjectIssuesRequest, _pmtProjectService, MethodNames.GetProjectIssues);
            return Ok(new APIResponse<List<IssueDetailsResponse>>() { IsSuccess = true, Data = response });
        }

        [HttpPost("GetProjectIssueTypes")]
        public async Task<IActionResult> GetProjectIssueTypes(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            var response = await ProcessAsync<GetProjectIssuesRequest, List<IssueTypesResponse>, IPMTProjectService>(getProjectIssuesRequest, _pmtProjectService, MethodNames.GetProjectIssueTypes);
            return Ok(new APIResponse<List<IssueTypesResponse>>() { IsSuccess = true, Data = response });
        }

        [HttpPost("GenerateProjectReleaseNotes")]
        public async Task<IActionResult> GenerateProjectReleaseNotes(GenerateProjectReleaseNotesRequest generateProjectReleaseNotesRequest)
        {
            var response = await ProcessAsync<GetProjectIssuesRequest, string, IPMTProjectService>(generateProjectReleaseNotesRequest, _pmtProjectService, MethodNames.GenerateProjectReleaseNotes);
            return Ok(new APIResponse<string>() { IsSuccess = true, Data = response });
        }

        [HttpPost("GetProjectLabels")]
        public async Task<IActionResult> GetProjectLabels(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            var response = await ProcessAsync<GetProjectIssuesRequest, List<string>, IPMTProjectService>(getProjectIssuesRequest, _pmtProjectService, MethodNames.GetProjectLabels);
            return Ok(new APIResponse<List<string>>() { IsSuccess = true, Data = response });
        }

        [HttpPost("DownloadReleaseNotes")]
        public async Task<IActionResult> DownloadReleaseNotes(DownloadReleaseNotesRequest downloadReleaseNotesRequest)
        {
            var response = await ProcessAsync<DownloadReleaseNotesRequest, MemoryStream, IPMTProjectService>(downloadReleaseNotesRequest, _pmtProjectService, MethodNames.DownloadReleaseNotes);
            return File(response.ToArray(), System.Net.Mime.MediaTypeNames.Application.Pdf, "Output.pdf");
        }
    }
}
