namespace MedicPortal.TransportObjects.DoctorDtos
{
    public class WorktimeView
    {
        public string Id { get; set; }
        public int DayOfWeek { get; set; }
        public double From { get; set; }
        public double Till { get; set; }
    }
}
