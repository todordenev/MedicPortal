﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.ViewModels
{
    public class AppointmentViewModelCreation
    {
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public DateTime Start { get; set; }
        public TimeSpan Duration { get; set; }
    }
}
