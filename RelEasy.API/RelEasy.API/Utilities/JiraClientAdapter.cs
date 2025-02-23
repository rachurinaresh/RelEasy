using Atlassian.Jira;
using RelEasy.API.Models;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Utilities.Contracts;

namespace RelEasy.API.Utilities
{
    public class JiraClientAdapter : IJiraClientAdapter
    {
        private Jira? jira = null;
        private readonly IPMTRepository _pmtRepository;

        public JiraClientAdapter(IPMTRepository pmtRepository)
        {
            _pmtRepository = pmtRepository;
        }

        public async Task InitializeJiraClient(string? organizationId)
        {
            var pmtOrganizationConfigDetails = await _pmtRepository.GetPMTOrganizationConfigDetails(organizationId);
            jira ??= Jira.CreateRestClient(pmtOrganizationConfigDetails.OrganizationURL, pmtOrganizationConfigDetails.AccountEmail, pmtOrganizationConfigDetails.AccountCredentials);
        }

        public async Task<List<Project>> GetAllProjects(string? organizationId)
        {
            if (jira == null)
            {
                await InitializeJiraClient(organizationId);
            }
            return jira!.Projects.GetProjectsAsync().Result.ToList();
        }

        public async Task<List<IssueType>> GetIssueTypesofProject(string projectKey, string? organizationId)
        {
            if (jira == null)
            {
                await InitializeJiraClient(organizationId);
            }
            var project = await jira.Projects.GetProjectAsync(projectKey);
            return project.GetIssueTypesAsync().Result.ToList();
        }

        public async Task<List<Issue>> GetAllIssuesByProjectKey(string projectKey, string? organizationId)
        {
            if (jira == null)
            {
                await InitializeJiraClient(organizationId);
            }
            var issues = new List<Issue>();

            int issuesPerRequest = 100;
            int startAt = 0;
            int total = 0;

            do
            {
                var newIssues =
                    await jira.Issues.GetIssuesFromJqlAsync("project=" + projectKey, maxIssues: issuesPerRequest, startAt).ConfigureAwait(false);

                issues.AddRange(newIssues);
                total = newIssues.TotalItems;
                startAt = startAt + newIssues.ItemsPerPage;

            } while (startAt < total);

            return issues.OrderBy((_) => _.Created).ToList();
        }


        public async Task<List<Issue>> GetAllIssuesByProjectKeyWithLabel(string projectKey, string? organizationId, string? labelName)
        {
            if (jira == null)
            {
                await InitializeJiraClient(organizationId);
            }
            var options = new IssueSearchOptions("project=" + projectKey)
            {
                FetchBasicFields = true,
                AdditionalFields = new List<string>() { "summary" }
            };
            var issues1 = await jira.Issues.GetIssuesFromJqlAsync(options);
            return issues1.ToList();
        }

        public async Task<Project> GetProject(string projectKey, string? organizationId)
        {
            if (jira == null)
            {
                await InitializeJiraClient(organizationId);
            }
            return await jira.Projects.GetProjectAsync(projectKey);
        }

    }
}
