using System;

namespace MedicPortal.Data.Models
{
    public class RegistrationCode
    {
        public string Id { get; set; }
        public DateTime Created { get; set; }
        public string CreatedBy { get; set; }
        public string DoctorId { get; set; }
        public bool IsUsed { get; set; }
        public string UsedById { get; set; }
        public DateTime? Used { get; set; }
    }
}
