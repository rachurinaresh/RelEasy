namespace RelEasy.API.Models.Response
{
    public class IssueDetailsResponse
    {
        public string? ParentIssueKey { get; set; }

        public string? Summary { get; set;}

        public string? Description { get; set; }
        public string? Type { get; set; }
        public string? Status { get; set; }
    }
}
