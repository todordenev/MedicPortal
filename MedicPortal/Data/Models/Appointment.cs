using System;

namespace MedicPortal.Data.Models
{
    public class Appointment
    {
        public string Id { get; set; }
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public bool ConfirmedByDoctor { get; set; }
        public bool ConfirmedByUser { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CatogoryId { get; set; }
    }
}
