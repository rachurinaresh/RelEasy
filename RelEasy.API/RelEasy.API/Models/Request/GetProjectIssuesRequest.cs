namespace RelEasy.API.Models.Request
{
    public class GetProjectIssuesRequest
    {
        public string? OrganizationId {  get; set; }
        public string? ProjectKey { get; set; }
    }
}
