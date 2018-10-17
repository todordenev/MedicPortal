using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedicPortal.ViewModels
{
    public class WorktimeViewModel
    {
        public int Id { get; set; }
        public int DayOfWeek { get; set; }
        public double From { get; set; }
        public double Till { get; set; }
    }
}
