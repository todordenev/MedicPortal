using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedicPortal.Data.Models
{
    public class Doctor
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [NotMapped]
        public IList<Patient> Patients { get; set; }  = new List<Patient>();
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public IList<Worktime> Worktimes { get; set; } = new List<Worktime>();
    }
}