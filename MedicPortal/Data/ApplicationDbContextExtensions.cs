using System;
using System.Security.Claims;
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

        public static void AddUserClaim(this ApplicationDbContext dbContext, AppUser user, Claim claim)
        {
            dbContext.AddUserClaim(user.Id, claim);
        }

        public static void AddUserClaim(this ApplicationDbContext dbContext, string userId, Claim claim)
        {
            dbContext.UserClaims.Add(new IdentityUserClaim<string>
            {
                UserId = userId,
                ClaimType = claim.Type,
                ClaimValue = claim.Value
            });
           
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