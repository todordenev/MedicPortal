using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;


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
        [NotMapped]
        public IList<Doctor> Doctors { get; set; } = new List<Doctor>();
        [JsonIgnore]
        public IList<DoctorPatient> DoctorPatients { get; set; } = new List<DoctorPatient>();
    }
}