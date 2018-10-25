namespace MedicPortal.Data.Models
{
    public class DoctorManager
    {
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}