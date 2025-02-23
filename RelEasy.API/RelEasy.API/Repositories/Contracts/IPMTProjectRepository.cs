using RelEasy.API.Models.Response;

namespace RelEasy.API.Repositories.Contracts
{
    public interface IPMTProjectRepository
    {
        public Task<ProjectDetailsResponse> GetProject(string projectId);

        public Task<List<ProjectDetailsResponse>> GetAllPMTProjects(string organizationId);

        public Task<List<ProjectDetailsResponse>> UpdateAllPMTProject(string organizationId);

        public Task<bool> SaveProjectConfiguration(string projectConfigurationId);
    }
}
