using System;

namespace MedicPortal.Data.Models
{
    public class SerialAppointment
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public int DayOfWeek { get; set; }

        public double From { get; set; }

        public int DurationInMinutes { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Title { get; set; }
        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}