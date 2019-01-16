using System.Security.Claims;

namespace MedicPortal.Helpers
{
    public static class UserToClaims
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            var claim = user.FindFirst(ClaimTypes.NameIdentifier);
            return claim?.Value;
        }

        public static bool IsPortalAdmin(this ClaimsPrincipal user)
        {
            return user.IsInRole("Admin");
        }
    }
}