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
    }
}
