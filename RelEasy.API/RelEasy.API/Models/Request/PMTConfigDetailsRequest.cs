namespace RelEasy.API.Models.Request
{
    public class PMTConfigDetailsRequest
    {
        public int UserId { get; set; }
        public int PMTId { get; set; }
        public int? PMTConfigId { get; set; }
        public string? PMTEmail { get; set; }
        public string? PMTPersonalAccessToken { get; set; }
    }
}
