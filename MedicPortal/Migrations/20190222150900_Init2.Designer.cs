﻿// <auto-generated />
using System;
using MedicPortal.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace MedicPortal.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20190222150900_Init2")]
    partial class Init2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MedicPortal.Data.Models.Appointment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Canceled");

                    b.Property<string>("CanceledById");

                    b.Property<int>("CategoryId");

                    b.Property<bool>("ConfirmedByDoctor");

                    b.Property<bool>("ConfirmedByUser");

                    b.Property<string>("DoctorId");

                    b.Property<int>("DurationInMinutes");

                    b.Property<bool>("IsCanceled");

                    b.Property<string>("PatientId");

                    b.Property<DateTime>("Start");

                    b.HasKey("Id");

                    b.HasIndex("CanceledById");

                    b.HasIndex("DoctorId");

                    b.HasIndex("PatientId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<byte[]>("AvatarImage");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Doctor", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AppUserId");

                    b.Property<bool>("Approved");

                    b.Property<string>("FirstName");

                    b.Property<string>("HauptImageSrc");

                    b.Property<string>("HeaderImageSrc");

                    b.Property<bool>("IsActive");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Doctors");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.DoctorSpezialisations", b =>
                {
                    b.Property<string>("DoctorId");

                    b.Property<string>("SpezialisationId");

                    b.HasKey("DoctorId", "SpezialisationId");

                    b.HasIndex("SpezialisationId");

                    b.ToTable("DoctorSpezialisations");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.EntityChange", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Action");

                    b.Property<DateTime>("Changed");

                    b.Property<string>("ChangedById");

                    b.Property<string>("EntityId");

                    b.Property<string>("EntityName");

                    b.HasKey("Id");

                    b.HasIndex("ChangedById");

                    b.ToTable("EntityChanges");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Image", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ContentType");

                    b.Property<byte[]>("ImageBytes");

                    b.HasKey("Id");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Patient", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<string>("AppUserId");

                    b.Property<string>("AvatarImgSrc");

                    b.Property<DateTime>("Birthdate");

                    b.Property<DateTime?>("Deleted");

                    b.Property<string>("DeletedById");

                    b.Property<string>("FirstName");

                    b.Property<bool>("IsDeleted");

                    b.Property<string>("LastName");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.HasIndex("DeletedById");

                    b.ToTable("Patients");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.RegistrationCode", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Created");

                    b.Property<string>("CreatedBy");

                    b.Property<string>("DoctorId");

                    b.Property<bool>("IsUsed");

                    b.Property<DateTime?>("Used");

                    b.Property<string>("UsedById");

                    b.HasKey("Id");

                    b.ToTable("RegistrationCodes");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.SerialAppointment", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CategoryId");

                    b.Property<int>("DayOfWeek");

                    b.Property<string>("DoctorId");

                    b.Property<int>("DurationInMinutes");

                    b.Property<DateTime?>("EndDate");

                    b.Property<double>("From");

                    b.Property<DateTime?>("StartDate");

                    b.Property<string>("Title");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.ToTable("SerialAppointments");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Spezialisation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Spezialisations");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Worktime", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DayOfWeek");

                    b.Property<string>("DoctorId");

                    b.Property<double>("From");

                    b.Property<double>("Till");

                    b.HasKey("Id");

                    b.HasIndex("DoctorId");

                    b.ToTable("Worktimes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Appointment", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser", "CanceledBy")
                        .WithMany()
                        .HasForeignKey("CanceledById");

                    b.HasOne("MedicPortal.Data.Models.Doctor", "Doctor")
                        .WithMany()
                        .HasForeignKey("DoctorId");

                    b.HasOne("MedicPortal.Data.Models.Patient", "Patient")
                        .WithMany()
                        .HasForeignKey("PatientId");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Doctor", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser")
                        .WithMany("Doctors")
                        .HasForeignKey("AppUserId");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.DoctorSpezialisations", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.Doctor", "Doctor")
                        .WithMany("DoctorSpezialisations")
                        .HasForeignKey("DoctorId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MedicPortal.Data.Models.Spezialisation", "Spezialisation")
                        .WithMany("DoctorSpezialisationses")
                        .HasForeignKey("SpezialisationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MedicPortal.Data.Models.EntityChange", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser", "ChangedBy")
                        .WithMany()
                        .HasForeignKey("ChangedById");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Patient", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser", "AppUser")
                        .WithMany("Patients")
                        .HasForeignKey("AppUserId");

                    b.HasOne("MedicPortal.Data.Models.AppUser", "DeletedBy")
                        .WithMany()
                        .HasForeignKey("DeletedById");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.SerialAppointment", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.Doctor", "Doctor")
                        .WithMany()
                        .HasForeignKey("DoctorId");
                });

            modelBuilder.Entity("MedicPortal.Data.Models.Worktime", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.Doctor", "Doctor")
                        .WithMany("Worktimes")
                        .HasForeignKey("DoctorId");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MedicPortal.Data.Models.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("MedicPortal.Data.Models.AppUser")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
