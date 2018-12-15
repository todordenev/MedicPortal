using System;

namespace MedicPortal.TransportObjects.PatientDtos
{
    public class PatientCreate
    {
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime Birthdate { get; set; }
        public string Adress { get; set; }
        public string Telefon { get; set; }
    }
}