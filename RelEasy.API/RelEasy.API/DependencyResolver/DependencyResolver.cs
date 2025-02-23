using RelEasy.API.DB.Contracts;
using RelEasy.API.DB;
using RelEasy.API.Services;
using RelEasy.API.Services.Contracts;
using RelEasy.API.Repositories.Contracts;
using RelEasy.API.Repositories;
using RelEasy.API.Utilities.Contracts;
using RelEasy.API.Utilities;
using RelEasy.Authentication.Common;
using RelEasy.Authentication.DependencyResolver;

namespace RelEasy.API.DependencyResolver
{
    public static class DependenciesResolver
    {
        /// <summary>
        /// Resolve the dependencies
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        public static void ResolveDependencies(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddJWTAuthentication(configuration);
            services.Configure<JwtSecurityTokenSettings>(configuration.GetSection(Authentication.Common.Constants.JwtSecurityToken));
            services.InjectServices();
            services.InjectRepositories();
        }

        /// <summary>
        /// Resolve the service dependencies
        /// </summary>
        /// <param name="services"></param>
        internal static void InjectServices(this IServiceCollection services)
        {
            services.AddTransient<IHomeService, HomeService>();
            services.AddTransient<IPMTService, PMTService>();
            services.AddTransient<IPMTProjectService, PMTProjectService>();
            services.AddTransient<IJiraClientAdapter, JiraClientAdapter>();
            services.AddTransient<IOrganizationService, OrganizationService>();
            services.AddTransient<IUserService, UserService>();
        }

        /// <summary>
        /// Resolve the Repository dependencies
        /// </summary>
        /// <param name="services"></param>
        internal static void InjectRepositories(this IServiceCollection services)
        {
            services.AddSingleton<IDBContext, DBContext>();
            services.AddTransient<IPMTRepository, PMTRepository>();
            services.AddTransient<IPMTProjectRepository, PMTProjectRepository>();
            services.AddTransient<IOrganizationRepository, OrganizationRepository>();
            services.AddTransient<IUserRepository, UserRepository>();
        }
    }
}
