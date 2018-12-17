using System;

namespace MedicPortal.Data.Models
{
    public class Appointment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public bool ConfirmedByDoctor { get; set; }
        public bool ConfirmedByUser { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CategoryId { get; set; }
        public bool Canceled { get; set; }
        public string CanceledById { get; set; }
        public AppUser CanceledBy { get; set; }
    }
}