using RelEasy.API.Models.Request;

namespace RelEasy.API.Services.Contracts
{
    public interface IOrganizationService
    {
        Task<bool> SaveOrganization(SaveOrganizationRequest saveOrganizationRequest);
    }
}
