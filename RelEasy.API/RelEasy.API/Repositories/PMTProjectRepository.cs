using RelEasy.API.Models.Response;
using RelEasy.API.Repositories.Contracts;

namespace RelEasy.API.Repositories
{
    public class PMTProjectRepository : IPMTProjectRepository
    {
        public Task<ProjectDetailsResponse> GetProject(string projectId)
        {
            return Task.FromResult(new ProjectDetailsResponse());
        }

        public Task<List<ProjectDetailsResponse>> GetAllPMTProjects(string organizationId)
        {
            return Task.FromResult(new List<ProjectDetailsResponse>());
        }

        public Task<List<ProjectDetailsResponse>> UpdateAllPMTProject(string organizationId)
        {
            return Task.FromResult(new List<ProjectDetailsResponse>());
        }

        public Task<bool> SaveProjectConfiguration(string projectConfigurationId)
        {
            return Task.FromResult(true);
        }
    }
}
