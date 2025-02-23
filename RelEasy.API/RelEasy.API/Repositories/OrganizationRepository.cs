using RelEasy.API.Common.Models;
using RelEasy.API.Constants;
using RelEasy.API.DB.Contracts;
using RelEasy.API.Models.Request;
using RelEasy.API.Repositories.Contracts;
using System.Data;
using System.Net;

namespace RelEasy.API.Repositories
{
    public class OrganizationRepository : IOrganizationRepository
    {
        private readonly IDBContext _dBContext;

        public OrganizationRepository(IDBContext dbContext)
        {
            _dBContext = dbContext;
        }

        public async Task<bool> SaveOrganization(SaveOrganizationRequest saveOrganizationRequest)
        {
            Dictionary<string, object> inputParams = new()
            {
                { "@PMTConfigId", saveOrganizationRequest?.PMTConfigId },
                { "@OrgName", saveOrganizationRequest.OrganizationName },
                { "@OrgUrl", saveOrganizationRequest.OrganizationURL },
                { "@OrgId", saveOrganizationRequest.OrganizationId == null ? DBNull.Value :  saveOrganizationRequest.OrganizationId},
                { "@UserId", saveOrganizationRequest?.UserId },
                { "@CreatedBy", saveOrganizationRequest?.UserId },
            };

            var outParams = new Dictionary<string, SqlDbType>()
            {
                { "@Message", SqlDbType.NVarChar }
            };

            var result = await _dBContext.ExecuteStoredProcedureAsync(StoredProcedureLiterals.SaveOrganization, inputParams, outParams);

            if (result.OutParamResponse.Any() && result.OutParamResponse.TryGetValue("@Message", out object? message))
            {
                var messageString = (string?)message;
                if (string.IsNullOrWhiteSpace(messageString))
                {
                    return true;
                }
                throw new CustomException(messageString, HttpStatusCode.BadRequest);
            }
            return true; ;
        }
    }
}
