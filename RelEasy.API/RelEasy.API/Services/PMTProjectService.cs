using Atlassian.Jira;
using RelEasy.API.Common.Models;
using RelEasy.API.Constants;
using RelEasy.API.Models;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Services.Contracts;
using RelEasy.API.Utilities.Contracts;
using Syncfusion.HtmlConverter;
using Syncfusion.Pdf;
using System.Net;

namespace RelEasy.API.Services
{
    public class PMTProjectService : IPMTProjectService
    {
        private readonly IPMTProjectRepository _pmtProjectRepository;
        private readonly IJiraClientAdapter _jiraClientAdapter;
        private List<HTMLTemplate> hTMLTemplates;
        private const string SyncFusionLicenseKey = "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1JpQHxbf1xzZFFMZVxbQHZPIiBoS35RdURjWXlfdnFVQmFcVUN2";

        public PMTProjectService(IPMTProjectRepository pmtProjectRepository, IJiraClientAdapter jiraClientAdapter)
        {
            _pmtProjectRepository = pmtProjectRepository;
            _jiraClientAdapter = jiraClientAdapter;
            hTMLTemplates = new List<HTMLTemplate>
            {
                new HTMLTemplate()
                {
                    HTMLTemplateId = 1,
                    HTMLTemplateName = "Basic",
                    HTMLTemplateProjectName = "<h1 style=\"font-size: 24pt;\">{ProjectName}</h1>",
                    HTMLTemplateProjectIssueType = "<h2 style=\"font-size: 20pt;\">{IssueType}</h2>",
                    HTMLTemplateProjectIssueInfo = "<h3>{IssueKey}:&nbsp;{IssueTitle}</h3>",
                    HTMLTemplateWithIssueDescription = "<ul>\r\n<li>{IssueDescription}</li>\r\n</ul>"
                }
            };
        }

        public Task<ProjectDetailsResponse> GetProject(string projectId)
        {
            return Task.FromResult(new ProjectDetailsResponse());
        }

        public async Task<List<ProjectDetailsResponse>> GetAllPMTProjects(string organizationId)
        {
            var projects = await _jiraClientAdapter.GetAllProjects(organizationId);
            var response = new List<ProjectDetailsResponse>();
            foreach (var project in projects)
            {
                var projDetails = new ProjectDetailsResponse()
                {
                    ProjectId = project.Id,
                    ProjectKey = project.Key,
                    ProjectName = project.Name,
                };
                response.Add(projDetails);
            }
            return response;
        }

        public Task<List<ProjectDetailsResponse>> UpdateAllPMTProject(string organizationId)
        {
            return Task.FromResult(new List<ProjectDetailsResponse>());
        }

        public Task<bool> SaveProjectConfiguration(string projectConfigurationId)
        {
            return Task.FromResult(true);
        }

        public async Task<List<IssueDetailsResponse>> GetProjectIssues(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            string projectKey = getProjectIssuesRequest.ProjectKey;
            string organizationId = getProjectIssuesRequest.OrganizationId;
            if (string.IsNullOrWhiteSpace(organizationId) || string.IsNullOrWhiteSpace(projectKey))
            {
                throw new CustomException(CommonConstants.InvalidOrganizationIdorProjectKey, HttpStatusCode.BadRequest);
            }
            var issues = await _jiraClientAdapter.GetAllIssuesByProjectKey(projectKey, organizationId);
            var response = new List<IssueDetailsResponse>();
            foreach (var issue in issues)
            {
                var issueDetails = new IssueDetailsResponse()
                {
                    ParentIssueKey = issue.Key.Value,
                    Summary = issue.Summary,
                    Description = issue.Description,
                    Type = issue.Type.Name,
                    Status = issue.Status.Name
                };
                response.Add(issueDetails);
            }
            return response;
        }

        public async Task<List<IssueTypesResponse>> GetProjectIssueTypes(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            string projectKey = getProjectIssuesRequest.ProjectKey;
            string organizationId = getProjectIssuesRequest.OrganizationId;
            if (string.IsNullOrWhiteSpace(organizationId) || string.IsNullOrWhiteSpace(projectKey))
            {
                throw new CustomException(CommonConstants.InvalidOrganizationIdorProjectKey, HttpStatusCode.BadRequest);
            }
            var issueTypes = await _jiraClientAdapter.GetIssueTypesofProject(projectKey, organizationId);
            var respone = new List<IssueTypesResponse>();
            foreach (var issueType in issueTypes)
            {
                var issue = new IssueTypesResponse()
                {
                    IssueTypeId = issueType.Id,
                    IssueTypeName = issueType.Name,
                };
                respone.Add(issue);
            }
            return respone;
        }

        public async Task<string> GenerateProjectReleaseNotes(GenerateProjectReleaseNotesRequest generateProjectReleaseNotesRequest)
        {
            string projectKey = generateProjectReleaseNotesRequest.ProjectKey;
            string organizationId = generateProjectReleaseNotesRequest.OrganizationId;
            var selectedHTMLTemplate = hTMLTemplates.FirstOrDefault((_) => _.HTMLTemplateId == generateProjectReleaseNotesRequest.HTMLTemplateId) ?? hTMLTemplates[0];
            if (string.IsNullOrWhiteSpace(organizationId) || string.IsNullOrWhiteSpace(projectKey))
            {
                throw new CustomException(CommonConstants.InvalidOrganizationIdorProjectKey, HttpStatusCode.BadRequest);
            }
            var issues = await _jiraClientAdapter.GetAllIssuesByProjectKey(projectKey, organizationId);
            var issueTypes = await _jiraClientAdapter.GetIssueTypesofProject(projectKey, organizationId);
            if (generateProjectReleaseNotesRequest.SelectedIssueTypeIds == null || generateProjectReleaseNotesRequest.SelectedIssueTypeIds.Count == 0)
            {
                generateProjectReleaseNotesRequest.SelectedIssueTypeIds = issueTypes.Select(_ => _.Id).ToList();
            }
            var project = await _jiraClientAdapter.GetProject(projectKey, organizationId);
            var responseString = "";
            responseString += responseString + selectedHTMLTemplate.HTMLTemplateProjectName.Replace("{ProjectName}", project.Name);
            foreach (var issueTypeId in generateProjectReleaseNotesRequest.SelectedIssueTypeIds)
            {
                var issuesWithFilters = issues.Where((_) => _.Type.Id == issueTypeId).ToList();
                if (!string.IsNullOrWhiteSpace(generateProjectReleaseNotesRequest.LabelValue))
                {
                    issuesWithFilters = issuesWithFilters.Where((_) => _.Labels.Contains(generateProjectReleaseNotesRequest.LabelValue)).ToList();
                }
                if (issuesWithFilters.Count > 0)
                {
                    responseString += selectedHTMLTemplate.HTMLTemplateProjectIssueType.Replace("{IssueType}", issueTypes.FirstOrDefault((_) => _.Id == issueTypeId).Name);
                    foreach (var issue in issuesWithFilters ?? Enumerable.Empty<Issue>())
                    {
                        var issueString = selectedHTMLTemplate.HTMLTemplateProjectIssueInfo;
                        issueString = issueString.Replace("{IssueKey}", issue.Key.ToString());
                        issueString = issueString.Replace("{IssueTitle}", issue.Summary);
                        if (generateProjectReleaseNotesRequest.IncludeIssueDescription ?? false)
                        {
                            issueString += selectedHTMLTemplate.HTMLTemplateWithIssueDescription.Replace("{IssueDescription}", issue.Description);
                        }
                        responseString += issueString;
                    }
                }
            }
            return responseString;

        }

        public async Task<List<string>> GetProjectLabels(GetProjectIssuesRequest getProjectIssuesRequest)
        {
            string projectKey = getProjectIssuesRequest.ProjectKey;
            string organizationId = getProjectIssuesRequest.OrganizationId;
            var issues = await _jiraClientAdapter.GetAllIssuesByProjectKey(projectKey, organizationId);
            var labelsList = new List<string>();
            foreach (var issue in issues)
            {
                labelsList.AddRange(issue.Labels.Where(_ => !labelsList.Contains(_)).ToList());
            }
            return labelsList;
        }

        public async Task<MemoryStream> DownloadReleaseNotes(DownloadReleaseNotesRequest downloadReleaseNotesRequest)
        {
            Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense(SyncFusionLicenseKey);
            HtmlToPdfConverter htmlConverter = new HtmlToPdfConverter();
            BlinkConverterSettings settings = new BlinkConverterSettings();
            settings.Scale = 1.0f;
            htmlConverter.ConverterSettings = settings;

            using (PdfDocument document = htmlConverter.Convert(downloadReleaseNotesRequest.HtmlBody, ""))
            {
                MemoryStream memoryStream = new MemoryStream();
                document.Save(memoryStream);
                memoryStream.Position = 0;
                return memoryStream;
            }
        }
    }
}
