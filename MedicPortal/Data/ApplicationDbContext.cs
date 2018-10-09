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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Patient>().HasOne(p => p.AppUser).WithMany(a => a.Patients);
            builder.Entity<Doctor>().HasOne(p => p.AppUser).WithMany(a => a.Doctors);
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Doctor);
            builder.Entity<DoctorPatient>().HasOne(dp => dp.Patient);
            builder.Entity<DoctorPatient>().HasKey(dp => new {dp.DoctorId, dp.PatientId});
            builder.Entity<Worktime>().HasOne(w => w.Doctor).WithMany(d => d.Worktimes);
            builder.Entity<Appointment>().HasOne(a => a.Doctor);
            builder.Entity<Appointment>().HasOne(a => a.Patient);
        }
    }
}