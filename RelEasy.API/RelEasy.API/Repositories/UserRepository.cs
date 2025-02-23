using RelEasy.API.Common.Models;
using RelEasy.API.Constants;
using RelEasy.API.DB.Contracts;
using RelEasy.API.Models.Request;
using RelEasy.API.Models.Response;
using RelEasy.API.Repositories.Contracts;
using RelEasy.Authentication.Models.DTO;
using System.Data;

namespace RelEasy.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDBContext _dBContext;

        public UserRepository(IDBContext dBContext)
        {
            _dBContext = dBContext;
        }

        public async Task<UserDTO?> GetUserInfo(string email)
        {
            var response = new UserDTO();

            Dictionary<string, object> inputParams = new()
            {
                { "@Email", string.IsNullOrWhiteSpace(email) ? DBNull.Value : email }
            };
            var dataTable = await _dBContext.ExecuteQueryAsync(DBQueries.GetUserInfo, inputParams);
            if (dataTable.Rows.Count == 0)
            {
                return null;
            }
            if (dataTable.Rows.Count == 0)
            {
                throw new Exception(CommonConstants.PMTOrganizationConfigDetailsNotFound);
            }
            var dataRow = dataTable.Rows[0];
            response.Id = (int)dataRow["Id"];
            response.UserName = dataRow["UserName"] == DBNull.Value ? null : (string)dataRow["UserName"];
            response.Email = dataRow["Email"] == DBNull.Value ? null : (string)dataRow["Email"];
            response.IsActive = dataRow["IsActive"] == DBNull.Value ? false : (bool)dataRow["IsActive"];
            return response.IsActive == false ? null : response;
        }

        public async Task<bool> RegisterUser(RegisterUserRequest registerUserRequest)
        {

            var existingUserInfo = await GetUserInfo(registerUserRequest.UserEmail);
            if (existingUserInfo != null)
            {
                throw new CustomException(string.Format(CommonConstants.UserWithEmailAlreadyExists, registerUserRequest.UserEmail));
            }
            try
            {
                Dictionary<string, object> dictionary = new()
                {
                     { "@Email", registerUserRequest.UserEmail },
                     { "@FirstName", registerUserRequest.FirstName },
                     { "@LastName", registerUserRequest.LastName },
                     { "@DisplayName", registerUserRequest.DisplayName }
                };
                var result = _dBContext.ExecuteNonQuery(DBQueries.RegisterUser, dictionary);
                return result == 1 ? true : false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
