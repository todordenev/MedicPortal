namespace MedicPortal.Data.Models
{
    public class DoctorSpezialisations
    {
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public string SpezialisationId { get; set; }
        public Spezialisation Spezialisation { get; set; }
    }
}