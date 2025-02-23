using System.Data;

namespace RelEasy.API.DB.Models
{
    public class ProcedureResponse
    {
        public DataTable Table { get; set; }
        public int? StatusCode { get; set; }
        public Dictionary<string, object?> OutParamResponse { get; set; }
    }
}
