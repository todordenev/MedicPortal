using System;
using MedicPortal.TransportObjects.DoctorDtos;
using MedicPortal.TransportObjects.PatientDtos;

namespace MedicPortal.TransportObjects.AppointmentDtos
{
    public class AppointmentView
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CategoryId { get; set; }
        public DoctorView Doctor { get; set; }
        public PatientView Patient { get; set; }
        public DateTime Canceled { get; set; }
        public bool IsCanceled { get; set; }

    }
}