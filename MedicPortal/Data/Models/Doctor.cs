using System;
using System.Collections.Generic;

namespace MedicPortal.Data.Models
{
    public class Doctor
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<Worktime> Worktimes { get; set; } = new List<Worktime>();
        public bool Approved { get; set; }
        public bool IsActive { get; set; }
        public IList<DoctorSpezialisations> DoctorSpezialisations { get; set; } = new List<DoctorSpezialisations>();
        public IList<DoctorPatient> DoctorPatients { get; set; } = new List<DoctorPatient>();
    }
}