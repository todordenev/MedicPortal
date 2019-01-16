using System;
using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Identity;

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
                Birthdate = new DateTime(1980, 1, 1)
            };
            dbContext.Patients.Add(patient);
            dbContext.SaveChanges();
            dbContext.UserClaims.Add(new IdentityUserClaim<string>
                {ClaimType = "permission", ClaimValue = patient.Id, UserId = user.Id});
            dbContext.SaveChanges();
        }
    }
}