using System.Collections.Generic;

namespace MedicPortal.TransportObjects.DoctorDtos
{
    public class DoctorCreate
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<WorktimeView> ViewModels { get; set; }
    }
}
