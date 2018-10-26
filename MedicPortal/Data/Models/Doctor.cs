using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace MedicPortal.Data.Models
{
    public class Doctor
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public IList<Worktime> Worktimes { get; set; } = new List<Worktime>();
        public bool Approved { get; set; }
        public bool IsActive { get; set; }
        public IList<DoctorSpezialisations> DoctorSpezialisations { get; set; } = new List<DoctorSpezialisations>();
        public IList<DoctorPatient> DoctorPatients { get; set; } = new List<DoctorPatient>();

    }
}