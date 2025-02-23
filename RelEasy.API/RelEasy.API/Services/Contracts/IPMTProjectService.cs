using Microsoft.AspNetCore.Mvc;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;

namespace RelEasy.API.Services.Contracts
{
    public interface IPMTProjectService
    {
        Task<ProjectDetailsResponse> GetProject(string projectId);

        Task<List<ProjectDetailsResponse>> GetAllPMTProjects(string organizationId);

        Task<List<ProjectDetailsResponse>> UpdateAllPMTProject(string organizationId);

        Task<bool> SaveProjectConfiguration(string projectConfigurationId);

        Task<List<IssueDetailsResponse>> GetProjectIssues(GetProjectIssuesRequest getProjectIssuesRequest);

        Task<List<IssueTypesResponse>> GetProjectIssueTypes(GetProjectIssuesRequest getProjectIssuesRequest);

        Task<string> GenerateProjectReleaseNotes(GenerateProjectReleaseNotesRequest generateProjectReleaseNotesRequest);
        
        Task<List<string>> GetProjectLabels(GetProjectIssuesRequest getProjectIssuesRequest);

        Task<MemoryStream> DownloadReleaseNotes(DownloadReleaseNotesRequest downloadReleaseNotesRequest);
    }
}
