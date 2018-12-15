using System;

namespace MedicPortal.TransportObjects.AppointmentDtos
{
    public class AppointmentCreate
    {
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CategoryId { get; set; }
    }
}
