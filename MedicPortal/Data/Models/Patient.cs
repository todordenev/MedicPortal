using System;


namespace MedicPortal.Data.Models
{
    public class Patient
    {
        public string Id { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthdate { get; set; }
        public string Adress { get; set; }
        public string Telefon { get; set; }
    }
}