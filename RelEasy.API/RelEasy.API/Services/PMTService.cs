using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Services.Contracts;

namespace RelEasy.API.Services
{
    public class PMTService : IPMTService
    {
        private readonly IPMTRepository _pmtRepository;

        public PMTService(IPMTRepository pmtRepository)
        {
            _pmtRepository = pmtRepository;
        }

        public async Task<List<GetPMTMasterDataResponse>> GetPMTMasterData(string userId)
        {
            return await _pmtRepository.GetPMTMasterData(userId);
        }

        public async Task<GetPMTConfigDetailsResponse> GetPMTConfigDetails(string pmtConfigId)
        {
            return await _pmtRepository.GetPMTConfigDetails(pmtConfigId);
        }

        public async Task<bool> SavePMTConfigDetails(PMTConfigDetailsRequest pmtConfigDetailsRequest)
        {
            return await _pmtRepository.SavePMTConfigDetails(pmtConfigDetailsRequest);
        }

        public async Task<List<OrganizationDetailsResponse>> GetPMTOrganizations(string pmtConfigId)
        {
            return await _pmtRepository.GetPMTOrganizations(pmtConfigId);
        }
    }
}
