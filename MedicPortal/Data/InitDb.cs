using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Identity;

namespace MedicPortal.Data
{
    public static class InitDb
    {
        private static ApplicationDbContext _dbContext;

        private static readonly List<AppUser> AppUsers = new List<AppUser>
        {
            new AppUser {Email = "user1@test.de", FirstName = "Test1", LastName = "User", PhoneNumber = "01234"},
            new AppUser {Email = "user2@test.de", FirstName = "Test2", LastName = "User", PhoneNumber = "01234"},
            new AppUser {Email = "user3@test.de", FirstName = "Test3", LastName = "User", PhoneNumber = "01234"},
            new AppUser {Email = "user4@test.de", FirstName = "Test4", LastName = "User", PhoneNumber = "01234"},
            new AppUser
            {
                Email = "todor_denev@yahoo.com", FirstName = "Todor", LastName = "Denev", PhoneNumber = "01234"
            }
        };

        private static readonly List<IdentityRole> Roles = new List<IdentityRole>
        {
            new IdentityRole("Admin"),
            new IdentityRole("Doctor")
        };


        private static readonly List<Doctor> Doctors = new List<Doctor>
        {
            new Doctor
            {
                Id = "1",
                Approved = true, AppUser = AppUsers[4], FirstName = "Irina", IsActive = true, LastName = "Ivanova",
                Worktimes = new List<Worktime>
                {
                    new Worktime {DayOfWeek = 0, From = 8, Till = 10.5},
                    new Worktime {DayOfWeek = 0, From = 10.75, Till = 13},
                    new Worktime {DayOfWeek = 1, From = 8, Till = 10.5},
                    new Worktime {DayOfWeek = 1, From = 10.75, Till = 13},
                    new Worktime {DayOfWeek = 2, From = 9, Till = 10.5},
                    new Worktime {DayOfWeek = 2, From = 10.75, Till = 13},
                    new Worktime {DayOfWeek = 3, From = 8.5, Till = 10.75},
                    new Worktime {DayOfWeek = 3, From = 11, Till = 12.5},
                    new Worktime {DayOfWeek = 4, From = 12.5, Till = 14.5},
                    new Worktime {DayOfWeek = 4, From = 14.75, Till = 18}
                }
            },
            new Doctor
            {
                Id = "2",
                Approved = true, AppUser = AppUsers[4], FirstName = "Kunka", IsActive = true, LastName = "Kuncheva",
                Worktimes = new List<Worktime>
                {
                    new Worktime {DayOfWeek = 0, From = 8, Till = 12},
                    new Worktime {DayOfWeek = 0, From = 13, Till = 16},
                    new Worktime {DayOfWeek = 1, From = 9, Till = 12},
                    new Worktime {DayOfWeek = 1, From = 13, Till = 16},
                    new Worktime {DayOfWeek = 2, From = 8, Till = 12},
                    new Worktime {DayOfWeek = 2, From = 13, Till = 16},
                    new Worktime {DayOfWeek = 3, From = 8, Till = 12},
                    new Worktime {DayOfWeek = 3, From = 13, Till = 16},
                    new Worktime {DayOfWeek = 4, From = 8, Till = 12},
                    new Worktime {DayOfWeek = 4, From = 13, Till = 16}
                }
            }
        };

        private static readonly List<Patient> Patients = new List<Patient>
        {
            new Patient
            {
                FirstName = "Todor", Adress = "Tiulbenska 62", AppUser = AppUsers[4],
                Birthdate = new DateTime(1982, 12, 11), LastName = "Denev", Telefon = "012345"
            },
            new Patient
            {
                FirstName = "Thea", Adress = "Mühlenstraße 4", AppUser = AppUsers[4],
                Birthdate = new DateTime(2016, 2, 20), LastName = "Denev"
            },
            new Patient
            {
                FirstName = "Daniel", Adress = "Mühlenstraße 4", AppUser = AppUsers[4],
                Birthdate = new DateTime(2013, 10, 7), LastName = "Denev"
            }
        };

        private static readonly List<Spezialisation> Spezialisations = new List<Spezialisation>
        {
            new Spezialisation {Name = "Педиатър"},
            new Spezialisation {Name = "Алерголог"},
            new Spezialisation {Name = "Общ лекър"},
            new Spezialisation {Name = "Вътрешни болести"}
        };

        private static readonly List<DoctorSpezialisations> DoctorSpezialisations = new List<DoctorSpezialisations>
        {
            new DoctorSpezialisations {Doctor = Doctors[0], Spezialisation = Spezialisations[0]},
            new DoctorSpezialisations {Doctor = Doctors[0], Spezialisation = Spezialisations[1]},
            new DoctorSpezialisations {Doctor = Doctors[1], Spezialisation = Spezialisations[1]},
            new DoctorSpezialisations {Doctor = Doctors[1], Spezialisation = Spezialisations[2]}
        };


        private static readonly List<Appointment> Appointmens = new List<Appointment>
        {
            new Appointment
            {
                Doctor = Doctors[0], Patient = Patients[0], Start = DateTime.Today.AddHours(8),
                DurationInMinutes = 10, ConfirmedByDoctor = true, ConfirmedByUser = true, CatogoryId = 0
            },
            new Appointment
            {       
                Doctor = Doctors[0], Patient = Patients[1], Start = DateTime.Today.AddHours(8.50),
                DurationInMinutes = 10, ConfirmedByDoctor = true, ConfirmedByUser = true, CatogoryId=1

            },
            new Appointment
            {
                Doctor = Doctors[0], Patient = Patients[0], Start = DateTime.Today.AddHours(10),
                DurationInMinutes = 10, ConfirmedByDoctor = true, ConfirmedByUser = true,CatogoryId = 0
            },
            new Appointment
            {
                Doctor = Doctors[0], Patient = Patients[1], Start = DateTime.Today.AddHours(11.50),
                DurationInMinutes = 30, ConfirmedByDoctor = true, ConfirmedByUser = true,CatogoryId = 2
            }
        };

        private static UserManager<AppUser> _userManager;

        public static void CeedDummyData(ApplicationDbContext dbContext, UserManager<AppUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
            if (_dbContext.Users.Any())
            {
                return;
            }

            Task.Run(async () => await EnsureUsers()).Wait();

            _dbContext.Roles.AddRange(Roles);
            _dbContext.AddRange(DoctorSpezialisations);
            _dbContext.AddRange(Doctors);
            _dbContext.AddRange(Patients);
            _dbContext.SaveChanges();
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = Roles[0].Id, UserId = AppUsers[4].Id});
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = Roles[1].Id, UserId = AppUsers[4].Id});
            _dbContext.Appointments.AddRange(Appointmens);
            _dbContext.SaveChanges();
        }


        public static async Task EnsureUsers()
        {
            foreach (var appUser in AppUsers)
            {
                await EnsureUser(appUser);
            }
        }

        private static async Task EnsureUser(AppUser appUser)
        {
            appUser.UserName = appUser.Email;
            await _userManager.CreateAsync(appUser, "123456");
        }
    }
}