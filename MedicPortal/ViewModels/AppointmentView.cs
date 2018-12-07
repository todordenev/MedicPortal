using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.ViewModels
{
    public class AppointmentView
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime Start { get; set; }
        public int DurationInMinutes { get; set; }
    }
}
