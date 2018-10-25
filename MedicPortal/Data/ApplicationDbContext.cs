using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<DoctorPatient> DoctorPatients { get; set; }
        public DbSet<Worktime> Worktimes { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Spezialisation> Spezialisations { get; set; }
        public DbSet<DoctorSpezialisations> DoctorSpezialisations { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Patient>().HasOne(p => p.AppUser).WithMany(a => a.Patients);
            builder.Entity<Doctor>().HasOne(p => p.AppUser).WithMany(a => a.Doctors);

            builder.Entity<DoctorPatient>().HasKey(dp => new {dp.DoctorId, dp.PatientId});
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Doctor).WithMany(d=>d.DoctorPatients);
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Patient).WithMany(p=>p.DoctorPatients);

            builder.Entity<DoctorSpezialisations>().HasKey(dp => new {dp.DoctorId, dp.SpezialisationId});
            builder.Entity<DoctorSpezialisations>().HasOne(ds => ds.Doctor).WithMany(d=>d.DoctorSpezialisations);
            builder.Entity<DoctorSpezialisations>().HasOne(ds => ds.Spezialisation).WithMany(s=>s.DoctorSpezialisationses);
            
            builder.Entity<DoctorManager>().HasOne(dm => dm.Doctor);
            builder.Entity<DoctorManager>().HasOne(dm => dm.AppUser);
            builder.Entity<DoctorManager>().HasKey(dm => new {dm.DoctorId, dm.AppUserId});
            
            builder.Entity<Worktime>().HasOne(w => w.Doctor).WithMany(d => d.Worktimes);
            builder.Entity<Appointment>().HasOne(a => a.Doctor);
            builder.Entity<Appointment>().HasOne(a => a.Patient);
        }
    }
}