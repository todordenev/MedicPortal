using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicPortal.Data.Models;
using MedicPortal.TransportObjects.AppUserDtos;

namespace MedicPortal.TransportObjects.DoctorDtos
{
    public class DoctorView
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AppUserId { get; set; }
        public IList<WorktimeView> Worktimes { get; set; } = new List<WorktimeView>();
        public bool Approved { get; set; }
        public bool IsActive { get; set; }
        public IList<string> Specialisations { get; set; } = new List<string>();
        public string HeaderImageSrc { get; set; }
        public string HauptImageSrc { get; set; }
    }
}
