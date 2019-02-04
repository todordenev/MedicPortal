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
        }

        public static void AddPermissionClaims(this ApplicationDbContext dbContext, AppUser user, Doctor doctor)
        {
            dbContext.UserClaims.Add(new IdentityUserClaim<string>
            {
                UserId = user.Id,
                ClaimType = RessourceClaimTypes.DoctorPermission,
                ClaimValue = doctor.Id
            });
            dbContext.SaveChanges();
        }

        public static void AddPermissionClaims(this ApplicationDbContext dbContext, AppUser user, Patient patient)
        {
            dbContext.UserClaims.Add(new IdentityUserClaim<string>
            {
                UserId = user.Id,
                ClaimType = RessourceClaimTypes.PatientPermission,
                ClaimValue = patient.Id
            });
            dbContext.SaveChanges();
        }

        public static void TryLockoutUser(this AppUser user)
        {
            if (user.LockoutEnd < DateTime.Now)
            {
            }
        }


        public static bool IsLocked(this AppUser user)
        {
            return user.LockoutEnd.HasValue && user.LockoutEnd.Value < DateTime.Now;
        }
    }
}