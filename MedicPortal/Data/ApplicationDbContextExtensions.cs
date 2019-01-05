using System;
using System.Linq;
using MedicPortal.Data.Models;
using MedicPortal.TransportObjects.AppUserDtos;

namespace MedicPortal.Data
{
    public static class ApplicationDbContextExtensions
    {
        public static void CreatePatientOnRegistration(this ApplicationDbContext dbContext, AppUser user)
        {
            var patient = new Patient
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Telefon = user.PhoneNumber,
                AppUserId = user.Id,
                Birthdate = new DateTime(1900,0,0)
            };
            dbContext.Patients.Add(patient);
            dbContext.SaveChanges();
        }
    }
}