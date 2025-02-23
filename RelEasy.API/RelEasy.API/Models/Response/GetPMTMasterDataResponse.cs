namespace RelEasy.API.Models.Response
{
    public class GetPMTMasterDataResponse
    {
        public int PMTId { get; set; }
        public string? PMTName { get; set; }
        public bool IsInitialConfigSet { get; set; }
        public int? PMTConfigId { get; set; }
    }
}
