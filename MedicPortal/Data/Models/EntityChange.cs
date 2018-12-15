using System;

namespace MedicPortal.Data.Models
{
    public class EntityChange
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public string EntityName { get; set; }
        public string EntityId { get; set; }
        public string Action { get; set; }
        public DateTime Changed { get; set; }
        public AppUser ChangedBy { get; set; }
        public string ChangedById { get; set; }
    }
}