using System;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using Microsoft.AspNetCore.Identity;

namespace MedicPortal.Data.Managers
{
    public class AccountManager
    {
        private readonly ApplicationDbContext _dbContext;
        private AppUser _currentUser;

        public AccountManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public string CurrentUserId { get; set; }

        public AppUser CurrentUser
        {
            get
            {
                if (CurrentUserId.IsNullOrEmpty())
                {
                    throw new NullReferenceException("CurrentUserId should not be empty");
                }

                return _currentUser ?? (_currentUser = _dbContext.Users.Find(_currentUser));
            }
        }

        public void AddPatient(Patient patient)
        {
            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();
            _dbContext.UserClaims.Add(new IdentityUserClaim<string>
            {
                UserId = CurrentUser.Id,
                ClaimType = ClaimTypes.RessourceType,
                ClaimValue = patient.Id
            });
            _dbContext.SaveChanges();
        }

        public void AddDoctor(Doctor doctor)
        {
            _dbContext.Doctors.Add(doctor);
            _dbContext.SaveChanges();
            _dbContext.UserClaims.Add(new IdentityUserClaim<string>
            {
                UserId = CurrentUser.Id,
                ClaimType = ClaimTypes.RessourceType,
                ClaimValue = doctor.Id
            });
            _dbContext.SaveChanges();
        }
    }
}