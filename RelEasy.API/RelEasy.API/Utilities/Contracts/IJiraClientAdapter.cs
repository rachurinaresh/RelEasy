using Atlassian.Jira;

namespace RelEasy.API.Utilities.Contracts
{
    public interface IJiraClientAdapter
    {
        public Task InitializeJiraClient(string organizationId);

        public Task<List<Project>> GetAllProjects(string organizationId);

        public Task<List<Issue>> GetAllIssuesByProjectKey(string projectKey, string organizationId);

        public Task<List<IssueType>> GetIssueTypesofProject(string projectKey, string? organizationId);

        Task<Project> GetProject(string projectKey, string? organizationId);
    }
}
