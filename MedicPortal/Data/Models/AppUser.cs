using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace MedicPortal.Data.Models
{
    public class AppUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Patient> Patients { get; set; } = new List<Patient>();
        public List<Doctor> Doctors { get; set; } = new List<Doctor>();
        
        public byte[] AvatarImage { get; set; }
    }
}