using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace MedicPortal.Data
{
    public class InitialisationDb
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly UserManager<AppUser> _userManager;
        private List<AppUser> _appUsers;
        private List<Doctor> _doctors;
        private List<Patient> _patients;
        private List<SerialAppointment> _serialAppointments;

        public InitialisationDb(IServiceProvider services)
        {
            _dbContext = services.GetRequiredService<ApplicationDbContext>();
            _userManager = services.GetRequiredService<UserManager<AppUser>>();
        }


        public void Ceed()
        {
            if (_dbContext.Users.Any())
            {
                return;
            }

            CeedUsers();
            CeedRoles();
            CeedDoctors();
            CeedSpezialisations();
            CeedPatients();
            CeedAppointments();
            CeedSerialAppointments();
        }


        private void CeedUsers()
        {
            _appUsers = new List<AppUser>
            {
                new AppUser
                {
                    Email = "todor_denev@yahoo.com",
                    FirstName = "Todor",
                    LastName = "Denev",
                    PhoneNumber = "089 90234 432"
                },
                new AppUser
                {
                    Email = "nelina_p@yahoo.de",
                    FirstName = "Nelina",
                    LastName = "Ivanova",
                    PhoneNumber = "0123 3212 1212"
                },
                new AppUser
                {
                    Email = "irina.ivanova@gmail.com",
                    FirstName = "Irina",
                    LastName = "Ivanova",
                    PhoneNumber = "089 76 56667"
                },
                new AppUser
                {
                    Email = "nujka.peeva@gmail.com",
                    FirstName = "Temenujka",
                    LastName = "Peeva",
                    PhoneNumber = "0987 765 567"
                },
                new AppUser
                {
                    Email = "ivan.ivanov@gmail.com",
                    FirstName = "Ivan",
                    LastName = "Ivanov",
                    PhoneNumber = "0987 765 561"
                },
                new AppUser
                {
                    Email = "todor.denev@gmail.com",
                    FirstName = "Todor",
                    LastName = "Denev (ADM)"
                }
            };
            Task.Run(async () => await EnsureUsers()).Wait();
        }

        private void CeedRoles()
        {
            var roles = new List<IdentityRole>
            {
                new IdentityRole("Admin"),
                new IdentityRole("Doctor")
            };
            _dbContext.Roles.AddRange(roles);
            _dbContext.SaveChanges();
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = roles[0].Id, UserId = _appUsers[5].Id});
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = roles[1].Id, UserId = _appUsers[2].Id});
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = roles[1].Id, UserId = _appUsers[3].Id});
            _dbContext.SaveChanges();
        }

        private void CeedDoctors()
        {
            _doctors = new List<Doctor>
            {
                new Doctor
                {
                    Id = "1",
                    Approved = true,
                    FirstName = "Ирина",
                    IsActive = true,
                    LastName = "Иванова",
                    Worktimes = new List<Worktime>
                    {
                        new Worktime {DayOfWeek = 0, From = 7.5, Till = 10.5},
                        new Worktime {DayOfWeek = 0, From = 11, Till = 13.5},
                        new Worktime {DayOfWeek = 1, From = 7.5, Till = 10.5},
                        new Worktime {DayOfWeek = 1, From = 10.75, Till = 13.5},
                        new Worktime {DayOfWeek = 2, From = 7.5, Till = 10.5},
                        new Worktime {DayOfWeek = 2, From = 10.75, Till = 13.5},
                        new Worktime {DayOfWeek = 3, From = 12.5, Till = 15.5},
                        new Worktime {DayOfWeek = 3, From = 15.75, Till = 18},
                        new Worktime {DayOfWeek = 4, From = 7.5, Till = 10.5},
                        new Worktime {DayOfWeek = 4, From = 10.75, Till = 13}
                    }
                },
                new Doctor
                {
                    Id = "2",
                    Approved = true,
                    FirstName = "Kunka",
                    IsActive = true,
                    LastName = "Kuncheva",
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

            _dbContext.AddRange(_doctors);
            _dbContext.SaveChanges();

            var docrotManageClaim = new Claim(PortalClaimTypes.DoctorManagePermission, _doctors[0].Id);
            _dbContext.AddUserClaim(_appUsers[2], docrotManageClaim);
            _dbContext.AddUserClaim(_appUsers[3], docrotManageClaim);
            _dbContext.SaveChanges();
        }

        private void CeedSpezialisations()
        {
            var spezialisations = new List<Spezialisation>
            {
                new Spezialisation {Name = "Педиатър"},
                new Spezialisation {Name = "Алерголог"},
                new Spezialisation {Name = "Общ лекaр"},
                new Spezialisation {Name = "Вътрешни болести"}
            };
            _dbContext.Spezialisations.AddRange(spezialisations);
            _dbContext.SaveChanges();

            var doctorSpezialisations = new List<DoctorSpezialisations>
            {
                new DoctorSpezialisations {Doctor = _doctors[0], Spezialisation = spezialisations[0]},
                new DoctorSpezialisations {Doctor = _doctors[0], Spezialisation = spezialisations[1]},
                new DoctorSpezialisations {Doctor = _doctors[1], Spezialisation = spezialisations[1]},
                new DoctorSpezialisations {Doctor = _doctors[1], Spezialisation = spezialisations[2]}
            };
            _dbContext.AddRange(doctorSpezialisations);
            _dbContext.SaveChanges();
        }

        private void CeedPatients()
        {
            _patients = new List<Patient>
            {
                new Patient
                {
                    FirstName = "Thea",
                    Adress = "Mühlenstraße 4, Hohenlinden",
                    AppUser = _appUsers[0],
                    Birthdate = new DateTime(2016, 2, 20),
                    LastName = "Denev"
                },
                new Patient
                {
                    FirstName = "Daniel",
                    Adress = "Mühlenstraße 4, Hohenlinden",
                    AppUser = _appUsers[0],
                    Birthdate = new DateTime(2013, 10, 7),
                    LastName = "Denev"
                },
                new Patient
                {
                    FirstName = "Peycho",
                    Adress = "Traitscho Kostov 16, Koprinka",
                    AppUser = _appUsers[3],
                    Birthdate = new DateTime(1962, 9, 11),
                    LastName = "Peev"
                }
            };
            _dbContext.AddRange(_patients);
            _dbContext.SaveChanges();
        }

        private void CeedSerialAppointments()
        {
            _serialAppointments = new List<SerialAppointment>
            {
                new SerialAppointment
                {
                    Doctor = _doctors[0],
                    DayOfWeek = 0,
                    From = 7.5,
                    DurationInMinutes = 90,
                    Title = "Работно време без часове",
                    StartDate = DateTime.Today,
                    EndDate = DateTime.MaxValue
                },
                new SerialAppointment
                {
                    Doctor = _doctors[0],
                    DayOfWeek = 1,
                    From = 7.5,
                    DurationInMinutes = 90,
                    Title = "Работно време без часове",
                    StartDate = DateTime.Today,
                    EndDate = DateTime.MaxValue
                },
                new SerialAppointment
                {
                    Doctor = _doctors[0],
                    DayOfWeek = 2,
                    From = 7.5,
                    DurationInMinutes = 90,
                    Title = "Работно време без часове",
                    StartDate = DateTime.Today,
                    EndDate = DateTime.MaxValue
                },
                new SerialAppointment
                {
                    Doctor = _doctors[0],
                    DayOfWeek = 3,
                    From = 12.5,
                    DurationInMinutes = 90,
                    Title = "Работно време без часове",
                    StartDate = DateTime.Today,
                    EndDate = DateTime.MaxValue
                },
                new SerialAppointment
                {
                    Doctor = _doctors[0],
                    DayOfWeek = 4,
                    From = 7.5,
                    DurationInMinutes = 90,
                    Title = "Работно време без часове",
                    StartDate = DateTime.Today,
                    EndDate = DateTime.MaxValue
                }
            };
            _dbContext.SerialAppointments.AddRange(_serialAppointments);
            _dbContext.SaveChanges();
        }

        private void CeedAppointments()
        {
            var appointmens = new List<Appointment>
            {
                new Appointment
                {
                    Doctor = _doctors[0],
                    Patient = _patients[0],
                    Start = DateTime.Today.AddHours(8),
                    DurationInMinutes = 10,
                    ConfirmedByDoctor = true,
                    ConfirmedByUser = true,
                    CategoryId = 0
                },
                new Appointment
                {
                    Doctor = _doctors[0],
                    Patient = _patients[1],
                    Start = DateTime.Today.AddHours(8.50),
                    DurationInMinutes = 10,
                    ConfirmedByDoctor = true,
                    ConfirmedByUser = true,
                    CategoryId = 1
                },
                new Appointment
                {
                    Doctor = _doctors[0],
                    Patient = _patients[0],
                    Start = DateTime.Today.AddHours(10),
                    DurationInMinutes = 10,
                    ConfirmedByDoctor = true,
                    ConfirmedByUser = true,
                    CategoryId = 0
                },
                new Appointment
                {
                    Doctor = _doctors[0],
                    Patient = _patients[1],
                    Start = DateTime.Today.AddHours(11.50),
                    DurationInMinutes = 30,
                    ConfirmedByDoctor = true,
                    ConfirmedByUser = true,
                    CategoryId = 2
                }
            };
            _dbContext.Appointments.AddRange(appointmens);
            _dbContext.SaveChanges();
        }


        public async Task EnsureUsers()
        {
            foreach (var appUser in _appUsers)
            {
                await EnsureUser(appUser);
            }
        }

        private async Task EnsureUser(AppUser appUser)
        {
            appUser.UserName = appUser.Email;
            await _userManager.CreateAsync(appUser, "123456");
            _dbContext.CreatePatientOnRegistration(appUser);
        }
    }
}