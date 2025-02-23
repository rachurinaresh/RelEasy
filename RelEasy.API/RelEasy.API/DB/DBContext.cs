using RelEasy.API.Constants;
using RelEasy.API.DB.Contracts;
using RelEasy.API.DB.Models;
using System.Data.SqlClient;
using System.Data;

namespace RelEasy.API.DB
{
    public class DBContext : IDBContext
    {
        private readonly string _connectionstring;

        public DBContext(IConfiguration configuration)
        {
            _connectionstring = configuration.GetConnectionString(CommonConstants.DataBaseConnectionString);
        }

        public async Task<DataTable> ExecuteQueryAsync(string query, Dictionary<string, object> keyValuePairs = null)
        {
            try
            {
                using var connection = OpenSQLConnection();

                using var sqlCommand = new SqlCommand(query, connection);
                sqlCommand.CommandType = CommandType.Text;
                if (keyValuePairs != null)
                {
                    var queryParams = GetSqlParameters(keyValuePairs);
                    sqlCommand.Parameters.AddRange(queryParams);
                }

                using (var result = await sqlCommand.ExecuteReaderAsync())
                {
                    var dataTable = new DataTable();
                    dataTable.Load(result);
                    return dataTable;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(CommonConstants.QueryExecutionError + " " + ex.Message);
            }
        }

        public int ExecuteNonQuery(string query, Dictionary<string, object> keyValuePairs)
        {
            using var connection = OpenSQLConnection();

            using var sqlCommand = new SqlCommand(query, connection);
            sqlCommand.CommandType = CommandType.Text;
            var queryParams = GetSqlParameters(keyValuePairs);
            sqlCommand.Parameters.AddRange(queryParams);
            var result = sqlCommand.ExecuteNonQuery();
            return result;
        }

        public async Task<int> ExecuteNonQueryAsync(string query, Dictionary<string, object> keyValuePairs)
        {
            using var connection = OpenSQLConnection();

            using var sqlCommand = new SqlCommand(query, connection);
            sqlCommand.CommandType = CommandType.Text;
            var queryParams = GetSqlParameters(keyValuePairs);
            sqlCommand.Parameters.AddRange(queryParams);
            var result = await sqlCommand.ExecuteNonQueryAsync();
            return result;
        }

        public async Task<ProcedureResponse> ExecuteStoredProcedureAsync(string storedProcName, Dictionary<string, object> keyValuePairs, Dictionary<string, SqlDbType> outParams = null)
        {
            try
            {
                using var connection = OpenSQLConnection();
                using var command = new SqlCommand(storedProcName, connection);
                command.CommandType = CommandType.StoredProcedure;
                var sqlParameters = GetSqlParameters(keyValuePairs, outParams);
                command.Parameters.AddRange(sqlParameters);
                var result = await command.ExecuteReaderAsync();
                DataTable table = new();
                table.Load(result);
                var outputParamResponse = new Dictionary<string, object?>();
                foreach (var property in outParams ?? Enumerable.Empty<KeyValuePair<string, SqlDbType>>())
                {
                    var value = command.Parameters[property.Key].Value == DBNull.Value ? null : command.Parameters[property.Key].Value;
                    outputParamResponse.TryAdd(property.Key, value);
                }

                return new ProcedureResponse()
                {
                    Table = table,
                    OutParamResponse = outputParamResponse
                };
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public SqlParameter[] GetSqlParameters(Dictionary<string, object> inputParams, Dictionary<string, SqlDbType> outParams = null)
        {
            var parametersList = new List<SqlParameter>();
            foreach (var property in inputParams ?? Enumerable.Empty<KeyValuePair<string, object>>())
            {
                if (property.Value != null)
                {
                    parametersList.Add(new SqlParameter(property.Key, property.Value));
                }
            }

            foreach (var property in outParams ?? Enumerable.Empty<KeyValuePair<string, SqlDbType>>())
            {
                var outParameter = new SqlParameter
                {
                    ParameterName = property.Key,
                    Direction = ParameterDirection.Output,
                    SqlDbType = property.Value,
                    Size = int.MaxValue
                };
                parametersList.Add(outParameter);
            }

            return parametersList.ToArray();
        }

        private SqlConnection OpenSQLConnection()
        {
            var connection = new SqlConnection(_connectionstring);
            connection.Open();
            if (connection.State != ConnectionState.Open)
            {
                throw new Exception(CommonConstants.FailedToConnectDB);
            }
            return connection;
        }
    }
}
