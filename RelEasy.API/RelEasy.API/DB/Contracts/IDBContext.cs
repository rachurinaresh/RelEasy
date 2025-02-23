using RelEasy.API.DB.Models;
using System.Data;
using System.Data.SqlClient;

namespace RelEasy.API.DB.Contracts
{
    public interface IDBContext
    {
        /// <summary>
        /// Executes string sql query in asynchronous mode
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        Task<DataTable> ExecuteQueryAsync(string query, Dictionary<string, object> keyValuePairs = null);

        /// <summary>
        /// Executes a query and returns the count of results effected
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyValuePairs"></param>
        /// <returns></returns>
        public int ExecuteNonQuery(string query, Dictionary<string, object> keyValuePairs);

        /// <summary>
        /// Executes a query asynchronously and returns the count of results effected
        /// </summary>
        /// <param name="query"></param>
        /// <param name="keyValuePairs"></param>
        /// <returns></returns>
        public Task<int> ExecuteNonQueryAsync(string query, Dictionary<string, object> keyValuePairs);

        /// <summary>
        /// Converts dictionary to SQLParameters
        /// </summary>
        /// <param name="dictionaryparam"></param>
        /// <param name="outParams"></param>
        /// <returns></returns>
        public SqlParameter[] GetSqlParameters(Dictionary<string, object> dictionaryparam, Dictionary<string, SqlDbType> outParams = null);

        /// <summary>
        /// Executes the Stored Procedure asynchronously
        /// </summary>
        /// <param name="storedProcName"></param>
        /// <param name="keyValuePairs"></param>
        /// <param name="outParams"></param>
        /// <returns></returns>
        public Task<ProcedureResponse> ExecuteStoredProcedureAsync(string storedProcName, Dictionary<string, object> keyValuePairs, Dictionary<string, SqlDbType> outParams = null);
    }
}
