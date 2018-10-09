namespace MedicPortal.Data.Models
{
    public class DoctorPatient
    {
        public Doctor Doctor { get; set; }
        public string DoctorId { get; set; }    
        public string PatientId { get; set; }
        public Patient Patient { get; set; }
        public bool ConfirmedByDoctor { get; set; }
        public bool ConfirmedByUser { get; set; }
    }
}