namespace RelEasy.API.Constants
{
    public static class MethodNames
    {
        public const string GetString = "GetString";

        #region PMT
        public const string GetPMTMasterData = "GetPMTMasterData";
        public const string GetPMTConfigDetails = "GetPMTConfigDetails";
        public const string SavePMTConfigDetails = "SavePMTConfigDetails";
        public const string GetPMTOrganizations = "GetPMTOrganizations";
        #endregion

        #region Project
        public const string GetProject = "GetProject";
        public const string GetAllPMTProjects = "GetAllPMTProjects";
        public const string UpdateAllPMTProject = "UpdateAllPMTProject";
        public const string SaveProjectConfiguration = "SaveProjectConfiguration";
        public const string GetProjectIssues = "GetProjectIssues";
        public const string GetProjectIssueTypes = "GetProjectIssueTypes";
        public const string GenerateProjectReleaseNotes = "GenerateProjectReleaseNotes";
        public const string GetProjectLabels = "GetProjectLabels";
        public const string DownloadReleaseNotes = "DownloadReleaseNotes";
        #endregion

        #region Organization
        public const string SaveOrganization = "SaveOrganization";
        #endregion

        #region User

        public const string Authorize = "Authorize";
        public const string RegisterUser = "RegisterUser";

        #endregion
    }
}
