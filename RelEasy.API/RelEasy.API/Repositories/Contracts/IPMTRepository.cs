using RelEasy.API.Models;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;

namespace RelEasy.API.Repositories.Contracts
{
    public interface IPMTRepository
    {
        public Task<List<GetPMTMasterDataResponse>> GetPMTMasterData(string userId);

        public Task<GetPMTConfigDetailsResponse> GetPMTConfigDetails(string pmtConfigId);

        public Task<bool> SavePMTConfigDetails(PMTConfigDetailsRequest pmtConfigDetailsRequest);

        public Task<List<OrganizationDetailsResponse>> GetPMTOrganizations(string pmtConfigId);

        public Task<PMTOrganizationConfigDetails> GetPMTOrganizationConfigDetails(string? organizationId);
    }
}
