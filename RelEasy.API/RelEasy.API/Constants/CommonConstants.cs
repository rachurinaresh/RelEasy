namespace RelEasy.API.Constants
{
    public static class CommonConstants
    {
        public const string Bearer = "Bearer";
        public const string Accept = "Accept";

        #region ErrorMessages

        public const string FailedToConnectDB = "Failed to connect database";
        public const string QueryExecutionError = "Exception while executing Query";
        public const string InvalidEmailRequest = "Invalid Email Request";

        public const string FailedToSavePMTConfigDetails = "Failed To Save PMTConfiguration Details";

        public const string PMTOrganizationConfigDetailsNotFound = "PMTOrganization ConfigDetails Not Found";
        public  const string PMTConfigurationDetailsNotFound = "PMTConfiguration Details Not Found";

        public const string InvalidOrganizationIdorProjectKey = "Invalid OrganizationId or ProjectKey";

        public const string InvalidToken = "Token is not valid";

        public const string UserNotFoundWithEmail = "User not found with EmailId : {0}";
        public const string UserWithEmailAlreadyExists = "User with EmailId : {0} already exists";

        #endregion ErrorMessages

        #region AppSettings

        public const string DataBaseConnectionString = "DataBaseConnection";

        #endregion AppSettings

        #region SProc Success Messages

        public const string SuccessfullySavedPMTConfigDetails = "Successfully Saved PMTConfiguration Details";

        #endregion

    }
}
