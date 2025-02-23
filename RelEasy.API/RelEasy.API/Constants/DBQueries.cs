namespace RelEasy.API.Constants
{
    public static class DBQueries
    {
        public const string GetAllPMTsMasterData = @"SELECT PMD.PMTId, PMD.PMTName, UPC.IsActive, UPC.PMTConfigurationId FROM PMTMasterData PMD LEFT JOIN PMTConfigurations PMTC ON PMD.PMTId = PMTC.PMTId LEFT JOIN UserPMTConfigurations UPC ON UPC.PMTConfigurationId = PMTC.PMTConfigurationId AND UPC.UserId = @UserId WHERE PMD.IsActive = 1";

        //Without USERID
        public const string GetPMTConfigDetails = @"SELECT PMTConfigurationId AS PMTConfigId, AccountEmail, AccountCredentials 
                                FROM PMTConfigurations 
                                WHERE PMTConfigurationId = @PMTConfigId";

        //With UserId
        public const string GetOrganizations1 = @"SELECT ORG.OrganizationId, ORG.OrganizationName, ORG.OrganizationURL  
                                FROM PMTOrganizationMap POM     
                                    JOIN UserPMTConfigurations UPC ON POM.UserPMTConfigurationId = UPC.UserPMTConfigurationId   
                                        AND UPC.UserId = 1 AND UPC.PMTConfigurationId = @PMTConfigId 
                                    JOIN Organizations ORG ON ORG.OrganizationId = POM.OrganizationId";

        //WithoutUserId
        public const string GetPMTOrganizations = @"SELECT ORG.OrganizationId, ORG.OrganizationName, ORG.OrganizationURL 
                                FROM PMTOrganizationMap POM 
                                    JOIN UserPMTConfigurations UPC ON POM.UserPMTConfigurationId = UPC.UserPMTConfigurationId 
                                        AND UPC.PMTConfigurationId = @PMTConfigId 
                                    JOIN Organizations ORG ON ORG.OrganizationId = POM.OrganizationId";

        public const string GetPMTOrganizationConfigDetails = @"SELECT OrganizationURL, PMTC.AccountEmail, PMTC.AccountCredentials 
                                FROM  Organizations ORG JOIN PMTOrganizationMap PMTOM ON ORG.OrganizationId = PMTOM.OrganizationId 
                                      JOIN UserPMTConfigurations UPC ON UPC.UserPMTConfigurationId = PMTOM.UserPMTConfigurationId 
                                      JOIN  PMTConfigurations PMTC ON UPC.PMTConfigurationId = PMTC.PMTConfigurationId  
                                WHERE  PMTOM.OrganizationId = @OrganizationId";

        public const string GetUserInfo = @"SELECT UserId AS Id, DisplayName AS UserName, Email, IsActive 
                                From UserDetails 
                                WHERE Email = @Email";

        public const string RegisterUser = @"INSERT INTO UserDetails([Email]
           ,[FirstName]
           ,[LastName]
           ,[DisplayName]
           ,[IsActive]) VALUES
           (@Email, @FirstName, @LastName, @DisplayName, 1)";
    }
}
