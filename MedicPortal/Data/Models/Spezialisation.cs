using System.Collections.Generic;
using Newtonsoft.Json;

namespace MedicPortal.Data.Models
{
    public class Spezialisation
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public IList<DoctorSpezialisations> DoctorSpezialisationses { get; set; } = new List<DoctorSpezialisations>();
    }
}