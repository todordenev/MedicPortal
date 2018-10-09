namespace MedicPortal.Data.Models
{
    public class Worktime
    {
        public int Id { get; set; }
        public int DayOfWeek { get; set; }

        /// <summary>
        ///     Represents the start of the working time in hours from midnight
        /// </summary>
        public double From { get; set; }

        /// <summary>
        ///     Represents the end of the working time in hours from midnight
        /// </summary>
        public double Till { get; set; }

        public int DoctorId { get; set; }
        public Doctor Doctor { get; set; }
    }
}