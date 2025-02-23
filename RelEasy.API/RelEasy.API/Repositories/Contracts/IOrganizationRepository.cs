using RelEasy.API.Models.Request;

namespace RelEasy.API.Repositories.Contracts
{
    public interface IOrganizationRepository
    {
        public Task<bool> SaveOrganization(SaveOrganizationRequest saveOrganizationRequest);
    }
}
