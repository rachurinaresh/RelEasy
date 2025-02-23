namespace RelEasy.API.Models.Response
{
    public class GetPMTConfigDetailsResponse
    {
        public int PMTConfigId { get; set; }
        public string? PMTEmail { get; set; }
        public string? PMTPersonalAccessToken { get; set; }
    }
}
