using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;

namespace RelEasy.API.Services.Contracts
{
    public interface IPMTService
    {
        public Task<List<GetPMTMasterDataResponse>> GetPMTMasterData(string userId);

        public Task<GetPMTConfigDetailsResponse> GetPMTConfigDetails(string pmtConfigId);

        public Task<bool> SavePMTConfigDetails(PMTConfigDetailsRequest pmtConfigDetailsRequest);

        public Task<List<OrganizationDetailsResponse>> GetPMTOrganizations(string pmtConfigId);
    }
}
