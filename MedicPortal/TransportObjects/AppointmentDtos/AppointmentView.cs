using System;

namespace MedicPortal.TransportObjects.AppointmentDtos
{
    public class AppointmentView
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
        public int CatogoryId { get; set; }
    }
}