using RelEasy.API.Models.Request;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Services
{
    public class OrganizationService : IOrganizationService
    {
        private readonly IOrganizationRepository _organizationRepository;

        public OrganizationService(IOrganizationRepository organizationRepository)
        {
            _organizationRepository = organizationRepository;
        }

        public async Task<bool> SaveOrganization(SaveOrganizationRequest saveOrganizationRequest)
        {
            return await _organizationRepository.SaveOrganization(saveOrganizationRequest);
        }
    }
}
