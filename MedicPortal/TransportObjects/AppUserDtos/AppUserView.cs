using System.Collections.Generic;
using System.Security.Claims;

namespace MedicPortal.TransportObjects.AppUserDtos
{
    public class AppUserView
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarImage { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public List<Claim> Claims { get; set; } = new List<Claim>();
        public List<string> Roles { get; set; } = new List<string>();
    }
}