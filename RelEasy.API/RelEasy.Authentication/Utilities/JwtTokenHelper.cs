using RelEasy.Authentication.Common;
using RelEasy.Authentication.Models.DTO;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace RelEasy.Authentication.Utilities
{
    public static class JwtTokenHelper
    {
        /// <summary>
        /// Get Refresh Token
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="JWTTokenId"></param>
        /// <param name="jwtSecurityTokenSettings"></param>
        /// <returns></returns>
        public static RefreshTokenDTO GetRefreshTokenDTO(int userId, string JWTTokenId, JwtSecurityTokenSettings jwtSecurityTokenSettings)
        {
            return new RefreshTokenDTO
            {
                UserId = userId,
                JWTTokenId = JWTTokenId,
                Token = GenerateRefreshToken(jwtSecurityTokenSettings),
                Expires = DateTime.UtcNow.AddDays(jwtSecurityTokenSettings.RefreshTokenDurationInDays)
            };
        }

        /// <summary>
        /// Generate JWT Token
        /// </summary>
        /// <param name="userClaims"></param>
        /// <param name="tokenId"></param>
        /// <param name="_jwtSettings"></param>
        /// <returns></returns>
        public static string GenerateJWTToken(UserClaimsDTO userClaims, string tokenId, JwtSecurityTokenSettings _jwtSettings)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userClaims.Email),
                new Claim(JwtRegisteredClaimNames.Jti, tokenId),
                new Claim("uid", userClaims.UserId.ToString()),
                new Claim("UserId", userClaims.UserId.ToString()),
                new Claim("EmailId", userClaims.Email),
                new Claim("UserName", userClaims.Name)
            };

            return GenerateJWTToken(claims, _jwtSettings);
        }

        /// <summary>
        /// Generate JWT Token
        /// </summary>
        /// <param name="claims"></param>
        /// <param name="_jwtSettings"></param>
        /// <returns></returns>
        public static string GenerateJWTToken(IEnumerable<Claim> claims, JwtSecurityTokenSettings _jwtSettings)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);
            return new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
        }

        /// <summary>
        /// Get Token Claims
        /// </summary>
        /// <param name="userClaims"></param>
        /// <param name="tokenId"></param>
        /// <param name="refreshTokenId"></param>
        /// <returns></returns>
        private static List<Claim> GetClaims(UserClaimsDTO userClaims, string tokenId, int refreshTokenId)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userClaims.Email),
                new Claim(JwtRegisteredClaimNames.Jti, tokenId),
                new Claim("uid", userClaims.UserId.ToString()),
                new Claim("UserId", userClaims.UserId.ToString()),
                new Claim("EmailId", userClaims.Email)
            };

            return claims;
        }

        /// <summary>
        /// Get Principal From Token
        /// </summary>
        /// <param name="token"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        /// <exception cref="InvalidOperationException"></exception>
        public static ClaimsPrincipal GetPrincipalFromToken(string token, string key)
        {
            try
            {
                var tokenValidationParameters = new TokenValidationParameters
                {
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    ValidateLifetime = false
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                SecurityToken securityToken;
                var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
                var jwtSecurityToken = securityToken as JwtSecurityToken;
                if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                {
                    throw new InvalidOperationException("Invalid Token");
                }

                return principal;
            }
            catch (Exception)
            {
                throw new InvalidOperationException("Invalid Token");
            }
        }

        /// <summary>
        /// Update status of Delete Refresh Token
        /// </summary>
        /// <param name="refreshTokens"></param>
        public static void UpdateDeleteStatus(IEnumerable<RefreshTokenDTO> refreshTokens)
        {
            foreach (var oldRefreshTokens in refreshTokens)
            {
                oldRefreshTokens.IsDeleted = true;
            }
        }

        #region Private Methods

        /// <summary>
        /// Generate Refresh Token
        /// </summary>
        /// <param name="jwtSecurityTokenSettings"></param>
        /// <returns></returns>
        private static string GenerateRefreshToken(JwtSecurityTokenSettings jwtSecurityTokenSettings)
        {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider())
            {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return Convert.ToBase64String(randomBytes);
            }
        }

        #endregion Private Methods
    }
}