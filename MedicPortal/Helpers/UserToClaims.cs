using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using MedicPortal.Data.Models;

namespace MedicPortal.Helpers
{
    public static class UserToClaims
    {
        public static IList<Claim> GetUserClaims(this AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(Constants.JwtClaimIdentifiers.Id, user.Id),
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.FamilyName, user.LastName ?? ""),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName ?? ""),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(Constants.JwtClaimIdentifiers.Phone, user.PhoneNumber ?? "")
            };
            return claims;
        }

        public static string GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.Claims.FirstOrDefault(cl => cl.Type == Constants.JwtClaimIdentifiers.Id);
            return claim?.Value;
        }
    }
}