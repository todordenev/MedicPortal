using System.Collections.Generic;

namespace MedicPortal.TransportObjects.AppUserDtos
{
    public class AppUserView
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarImage { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; } = new List<string>();
    }
}