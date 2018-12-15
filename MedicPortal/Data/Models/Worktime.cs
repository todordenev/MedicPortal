using System;

namespace MedicPortal.Data.Models
{
    public class Worktime
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public int DayOfWeek { get; set; }

        /// <summary>
        ///     Represents the start of the working time in hours from midnight
        /// </summary>
        public double From { get; set; }

        /// <summary>
        ///     Represents the end of the working time in hours from midnight
        /// </summary>
        public double Till { get; set; }

        public string DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}