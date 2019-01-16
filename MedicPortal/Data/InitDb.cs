using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicPortal.Data.Managers;
using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace MedicPortal.Data
{
    public class InitDb
    {
        private readonly AccountManager _accountManager;
        private readonly ApplicationDbContext _dbContext;

        private readonly List<Spezialisation> _spezialisations = new List<Spezialisation>
        {
            new Spezialisation {Name = "Педиатър"},
            new Spezialisation {Name = "Алерголог"},
            new Spezialisation {Name = "Общ лекaр"},
            new Spezialisation {Name = "Вътрешни болести"}
        };

        private readonly UserManager<AppUser> _userManager;

        private List<Appointment> _appointmens;
        private List<AppUser> _appUsers;
        private List<Doctor> _doctors;
        private List<DoctorSpezialisations> _doctorSpezialisations;
        private List<Patient> _patients;
        private List<IdentityRole> _roles;
        private List<SerialAppointment> _serialAppointments;

        public InitDb(IServiceProvider services)
        {
            _dbContext = services.GetRequiredService<ApplicationDbContext>();
            _userManager = services.GetRequiredService<UserManager<AppUser>>();
            _accountManager = services.GetRequiredService<AccountManager>();
        }

        private void InitSerialAppointments()
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
        }

        private void InitSpezialitions()
        {
            _doctorSpezialisations = new List<DoctorSpezialisations>
            {
                new DoctorSpezialisations {Doctor = _doctors[0], Spezialisation = _spezialisations[0]},
                new DoctorSpezialisations {Doctor = _doctors[0], Spezialisation = _spezialisations[1]},
                new DoctorSpezialisations {Doctor = _doctors[1], Spezialisation = _spezialisations[1]},
                new DoctorSpezialisations {Doctor = _doctors[1], Spezialisation = _spezialisations[2]}
            };
        }

        private void InitAppointments()
        {
            _appointmens = new List<Appointment>
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
        }

        private void InitRoles()
        {
            _roles = new List<IdentityRole>
            {
                new IdentityRole("Admin"),
                new IdentityRole("Doctor")
            };
        }

        private void InitPatients()
        {
            _patients = new List<Patient>
            {
                new Patient
                {
                    FirstName = "Thea",
                    Adress = "Mühlenstraße 4",
                    AppUser = _appUsers[4],
                    Birthdate = new DateTime(2016, 2, 20),
                    LastName = "Denev"
                },
                new Patient
                {
                    FirstName = "Daniel",
                    Adress = "Mühlenstraße 4",
                    AppUser = _appUsers[4],
                    Birthdate = new DateTime(2013, 10, 7),
                    LastName = "Denev"
                }
            };
        }

        private void InitDoctors()
        {
            _doctors = new List<Doctor>
            {
                new Doctor
                {
                    Id = "1",
                    Approved = true,
                    AppUser = _appUsers[4],
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
                    AppUser = _appUsers[4],
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
        }

        private void InitUsers()
        {
            _appUsers = new List<AppUser>
            {
                new AppUser {Email = "user1@test.de", FirstName = "Test1", LastName = "User", PhoneNumber = "01234"},
                new AppUser {Email = "user2@test.de", FirstName = "Test2", LastName = "User", PhoneNumber = "01234"},
                new AppUser {Email = "user3@test.de", FirstName = "Test3", LastName = "User", PhoneNumber = "01234"},
                new AppUser {Email = "user4@test.de", FirstName = "Test4", LastName = "User", PhoneNumber = "01234"},
                new AppUser
                {
                    Email = "todor_denev@yahoo.com",
                    FirstName = "Todor",
                    LastName = "Denev",
                    PhoneNumber = "01234"
                }
            };
        }

        public void CeedDummyData()
        {
            if (_dbContext.Users.Any())
            {
                return;
            }

            InitUsers();
            InitDoctors();
            InitPatients();
            InitRoles();
            InitAppointments();
            InitSerialAppointments();
            InitSpezialitions();

            Task.Run(async () => await EnsureUsers()).Wait();

            _dbContext.Roles.AddRange(_roles);
            _dbContext.AddRange(_doctorSpezialisations);
            _dbContext.AddRange(_doctors);
            _dbContext.AddRange(_patients);
            _dbContext.SaveChanges();
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = _roles[0].Id, UserId = _appUsers[4].Id});
            _dbContext.UserRoles.Add(new IdentityUserRole<string> {RoleId = _roles[1].Id, UserId = _appUsers[4].Id});
            _dbContext.Appointments.AddRange(_appointmens);
            _dbContext.SerialAppointments.AddRange(_serialAppointments);
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