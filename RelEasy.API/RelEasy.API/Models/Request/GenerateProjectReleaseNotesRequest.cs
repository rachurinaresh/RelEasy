namespace RelEasy.API.Models.Request
{
    public class GenerateProjectReleaseNotesRequest : GetProjectIssuesRequest
    {
        public List<string> SelectedIssueTypeIds { get; set; }

        public bool? IncludeIssueDescription { get; set; }

        public string? LabelValue { get; set; }

        public int? HTMLTemplateId { get; set; }
    }
}
