namespace RelEasy.API.Models.Request
{
    public class SaveOrganizationRequest
    {
        public int UserId { get; set; }
        public int PMTConfigId { get; set; }
        public int? OrganizationId { get; set; }
        public string? OrganizationName { get; set; }
        public string? OrganizationURL { get; set; }
    }
}
