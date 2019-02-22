using System;
using System.Collections.Generic;

namespace MedicPortal.Data.Models
{
    public class Patient
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthdate { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? Deleted { get; set; }
        public AppUser DeletedBy { get; set; }
        public string DeletedById { get;set; }
        public string AvatarImgSrc { get; set; }
    }
}