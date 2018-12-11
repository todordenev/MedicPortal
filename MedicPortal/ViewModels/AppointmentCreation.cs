using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.ViewModels
{
    public class AppointmentCreation
    {
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CategoryId { get; set; }
    }
}
