using System.ComponentModel.DataAnnotations;

namespace RelEasy.Authentication.Models.Requests
{
    public class RefreshTokenRequest
    {
        /// <summary>
        /// Jwt Token
        /// </summary>
        [Required]
        public string Token { get; set; }

        /// <summary>
        /// Refresh Token
        /// </summary>
        [Required]
        public string RefreshToken { get; set; }
    }
}