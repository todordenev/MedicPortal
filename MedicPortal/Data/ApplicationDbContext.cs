using System;
using System.Linq;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        private readonly string _currentUserId;

        public ApplicationDbContext(DbContextOptions options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _currentUserId = httpContextAccessor.HttpContext?.User?.GetUserId();
        }


        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<DoctorPatient> DoctorPatients { get; set; }
        public DbSet<Worktime> Worktimes { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Spezialisation> Spezialisations { get; set; }
        public DbSet<DoctorSpezialisations> DoctorSpezialisations { get; set; }
        public DbSet<SerialAppointment> SerialAppointments { get; set; }
        public DbSet<EntityChange> EntityChanges { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Patient>().HasOne(p => p.AppUser).WithMany(a => a.Patients);
            builder.Entity<Doctor>().HasOne(p => p.AppUser).WithMany(a => a.Doctors);

            builder.Entity<DoctorPatient>().HasKey(dp => new {dp.DoctorId, dp.PatientId});
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Doctor).WithMany(d => d.DoctorPatients);
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Patient).WithMany(p => p.DoctorPatients);

            builder.Entity<DoctorSpezialisations>().HasKey(dp => new {dp.DoctorId, dp.SpezialisationId});
            builder.Entity<DoctorSpezialisations>().HasOne(ds => ds.Doctor).WithMany(d => d.DoctorSpezialisations);
            builder.Entity<DoctorSpezialisations>().HasOne(ds => ds.Spezialisation)
                .WithMany(s => s.DoctorSpezialisationses);

            builder.Entity<DoctorManager>().HasOne(dm => dm.Doctor);
            builder.Entity<DoctorManager>().HasOne(dm => dm.AppUser);
            builder.Entity<DoctorManager>().HasKey(dm => new {dm.DoctorId, dm.AppUserId});

            builder.Entity<Worktime>().HasOne(w => w.Doctor).WithMany(d => d.Worktimes);
            builder.Entity<Appointment>().HasOne(a => a.Doctor);
            builder.Entity<Appointment>().HasOne(a => a.Patient);
            builder.Entity<Appointment>().HasOne(a => a.CanceledBy);

            builder.Entity<SerialAppointment>().HasOne(a => a.Doctor);
            builder.Entity<EntityChange>().HasOne(e => e.ChangedBy);
        }

        public override int SaveChanges()
        {
            LogChangesInDb();
            return base.SaveChanges();
        }

        private void LogChangesInDb()
        {
            var entries = ChangeTracker.Entries().Where(ent => ent.State != EntityState.Unchanged).ToList();

            foreach (var entry in entries)
            {
                var entityChange = new EntityChange();
                entityChange.ChangedById = _currentUserId;
                entityChange.Changed = DateTime.Now;
                entityChange.Action = Enum.GetName(entry.State.GetType(), entry.State);
                entityChange.EntityName = entry.Entity.GetType().Name;
                entityChange.EntityId = entry.Entity.GetStringProperty("Id");
                EntityChanges.Add(entityChange);
            }
        }
    }
}