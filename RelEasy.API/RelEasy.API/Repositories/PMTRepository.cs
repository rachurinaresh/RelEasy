using RelEasy.API.Common.Models;
using RelEasy.API.Constants;
using RelEasy.API.DB.Contracts;
using RelEasy.API.Models;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;
using RelEasy.API.Repositories.Contracts;
using System.Data;
using System.Net;

namespace RelEasy.API.Repositories
{
    public class PMTRepository : IPMTRepository
    {
        private readonly IDBContext _dBContext;

        public PMTRepository(IDBContext dbContext)
        {
            _dBContext = dbContext;
        }

        public async Task<List<GetPMTMasterDataResponse>> GetPMTMasterData(string userId)
        {
            var response = new List<GetPMTMasterDataResponse>();

            Dictionary<string, object> inputParams = new()
            {
                { "@UserId", string.IsNullOrWhiteSpace(userId) ? DBNull.Value : userId }
            };
            var dataTable = await _dBContext.ExecuteQueryAsync(DBQueries.GetAllPMTsMasterData, inputParams);
            if (dataTable.Rows.Count == 0)
            {
                return new List<GetPMTMasterDataResponse>();
            }
            else
            {
                foreach (DataRow row in dataTable.Rows)
                {
                    response.Add(new GetPMTMasterDataResponse()
                    {
                        PMTId = (int)row["PMTId"],
                        PMTName = (string)row["PMTName"],
                        IsInitialConfigSet = row["IsActive"] == DBNull.Value ? false : (bool)row["IsActive"],
                        PMTConfigId = row["PMTConfigurationId"] == DBNull.Value ? null : (int)row["PMTConfigurationId"],
                    });
                }
            }
            return response;
        }

        public async Task<GetPMTConfigDetailsResponse> GetPMTConfigDetails(string pmtConfigId)
        {
            var response = new GetPMTConfigDetailsResponse();

            Dictionary<string, object> inputParams = new()
            {
                { "@PMTConfigId", string.IsNullOrWhiteSpace(pmtConfigId) ? DBNull.Value : pmtConfigId }
            };
            var dataTable = await _dBContext.ExecuteQueryAsync(DBQueries.GetPMTConfigDetails, inputParams);
            if (dataTable.Rows.Count == 0)
            {
                throw new Exception(CommonConstants.PMTConfigurationDetailsNotFound);
            }
            var dataRow = dataTable.Rows[0];
            response.PMTConfigId = (int)dataRow["PMTConfigId"];
            response.PMTEmail = dataRow["AccountEmail"] == DBNull.Value ? null : (string)dataRow["AccountEmail"];
            response.PMTPersonalAccessToken = dataRow["AccountCredentials"] == DBNull.Value ? null : (string)dataRow["AccountCredentials"];
            return response;
        }

        public async Task<bool> SavePMTConfigDetails(PMTConfigDetailsRequest pmtConfigDetailsRequest)
        {
            Dictionary<string, object> inputParams = new()
            {
                { "@PMTConfigId", pmtConfigDetailsRequest?.PMTConfigId == null || pmtConfigDetailsRequest?.PMTConfigId == 0 ? DBNull.Value : pmtConfigDetailsRequest?.PMTConfigId},
                { "@PMTEmail", pmtConfigDetailsRequest.PMTEmail },
                { "@PMTPersonalAccessToken", pmtConfigDetailsRequest.PMTPersonalAccessToken },
                { "@PMTId", pmtConfigDetailsRequest.PMTId },
                { "@UserId", pmtConfigDetailsRequest?.UserId },
                { "@CreatedBy", pmtConfigDetailsRequest?.UserId },
            };

            var outParams = new Dictionary<string, SqlDbType>()
            {
                { "@Message", SqlDbType.NVarChar }
            };

            var result = await _dBContext.ExecuteStoredProcedureAsync(StoredProcedureLiterals.SavePMTConfigDetails, inputParams, outParams);

            if (result.OutParamResponse.Any() && result.OutParamResponse.TryGetValue("@Message", out object? message))
            {
                var messageString = (string?)message;
                if (string.IsNullOrWhiteSpace(messageString))
                {
                    return true;
                }
                throw new CustomException(messageString, HttpStatusCode.BadRequest);
            }
            return true;
        }

        public async Task<List<OrganizationDetailsResponse>> GetPMTOrganizations(string pmtConfigId)
        {
            var response = new List<OrganizationDetailsResponse>();

            Dictionary<string, object> inputParams = new()
            {
                { "@PMTConfigId", string.IsNullOrWhiteSpace(pmtConfigId) ? DBNull.Value : pmtConfigId }
            };
            var dataTable = await _dBContext.ExecuteQueryAsync(DBQueries.GetPMTOrganizations, inputParams);
            if (dataTable.Rows.Count == 0)
            {
                return new List<OrganizationDetailsResponse>();
            }
            foreach (DataRow row in dataTable.Rows)
            {
                var organization = new OrganizationDetailsResponse
                {
                    OrganizationURL = row["OrganizationURL"] == DBNull.Value ? null : (string)row["OrganizationURL"],
                    OrganizationId = (int)row["OrganizationId"],
                    OrganizationName = row["OrganizationName"] == DBNull.Value ? null : (string)row["OrganizationName"]
                };
                response.Add(organization);
            }
            return response;
        }

        public async Task<PMTOrganizationConfigDetails> GetPMTOrganizationConfigDetails(string? organizationId)
        {
            var result = new PMTOrganizationConfigDetails();

            Dictionary<string, object> inputParams = new()
            {
                { "@OrganizationId", string.IsNullOrWhiteSpace(organizationId) ? DBNull.Value : organizationId }
            };
            var dataTable = await _dBContext.ExecuteQueryAsync(DBQueries.GetPMTOrganizationConfigDetails, inputParams);
            if (dataTable.Rows.Count == 0)
            {
                throw new Exception(CommonConstants.PMTOrganizationConfigDetailsNotFound);
            }
            var dataRow = dataTable.Rows[0];
            result.OrganizationURL = (string)dataRow["OrganizationURL"];
            result.AccountEmail = dataRow["AccountEmail"] == DBNull.Value ? null : (string)dataRow["AccountEmail"];
            result.AccountCredentials = dataRow["AccountCredentials"] == DBNull.Value ? null : (string)dataRow["AccountCredentials"];
            return result;
        }
    }
}
