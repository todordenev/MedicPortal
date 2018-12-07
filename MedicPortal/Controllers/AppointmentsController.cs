﻿using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Route("api/appointments")]
    [ApiController]
    [Authorize]
    [Produces("application/json")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private string _currentUserId;

        public AppointmentsController(ApplicationDbContext appDbContext, IMapper mapper)
        {
            _dbContext = appDbContext;
            _mapper = mapper;
        }

        public string CurrentUserId => _currentUserId ?? (_currentUserId = User.GetUserId());

        // GET api/appointments/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {
            var appointment = await _dbContext.Appointments.Include(a => a.Doctor).FirstOrDefaultAsync(d => d.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }

            if (User.IsPortalAdmin()
                || IsCurrentUserDoctor(appointment)
                || IsCurrentUserPatient(appointment))
            {
                return Ok(appointment);
            }

            return Unauthorized();
        }

        [HttpPost]
        public IActionResult Post([FromBody] AppointmentCreation model)
        {
            try
            {
                var appointment = _mapper.Map<Appointment>(model);
                appointment.ConfirmedByDoctor = model.DoctorId == CurrentUserId;
                appointment.ConfirmedByUser =
                    _dbContext.Patients.Any(p => p.AppUserId == CurrentUserId && p.Id == model.PatientId);

                if (User.IsPortalAdmin() || appointment.ConfirmedByDoctor || appointment.ConfirmedByUser)
                {
                    _dbContext.Appointments.Add(appointment);
                    _dbContext.SaveChanges();
                    return Ok();
                }

                return Unauthorized();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }


        [HttpGet("doctor/{doctorId}/{date}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string doctorId, DateTime date)
        {
            var currentUserId = User.GetUserId();
            var user = _dbContext.Users.Include(u => u.Doctors)
                .First(u => u.Id == currentUserId);

            var from = date.Date;
            var till = from.AddDays(1);
            var appointments = await _dbContext.Appointments.Include(a => a.Patient)
                .Where(a => a.DoctorId == doctorId && a.Start > from && a.Start < till)
                .Select(app => MaskIfNotAutorized(app, user))
                .ToListAsync();
            return Ok(appointments);
        }

        [HttpGet("doctorappointments/{doctorId}/{date}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetForDoctor(string doctorId, DateTime date)
        {
            var currentUserId = User.GetUserId();
            var user = _dbContext.Users.Include(u => u.Doctors)
                .First(u => u.Id == currentUserId);
            if (User.IsPortalAdmin() || user.Doctors.Any(d => d.Id == doctorId))
            {
                var from = date.Date;
                var till = @from.AddDays(1);
                var appointments = await _dbContext.Appointments.Include(a => a.Patient)
                    .Where(a => a.DoctorId == doctorId && a.Start > @from && a.Start < till)
                    .ToListAsync();
                return Ok(appointments);
            }

            return Unauthorized();
        }


        private AppointmentView MaskIfNotAutorized(Appointment app, AppUser user)
        {
            if (user.Doctors.Any(d => d.Id == app.DoctorId))
            {
                return _mapper.Map<AppointmentView>(app);
            }

            if (user.Patients.Any(p => p.Id == app.Id))
            {
                return _mapper.Map<AppointmentView>(app);
            }

            return new AppointmentView {Start = app.Start, DurationInMinutes = app.DurationInMinutes};
        }


        private bool IsCurrentUserDoctor(Appointment appointment)
        {
            return appointment.Doctor.AppUserId == User.GetUserId();
        }

        private bool IsCurrentUserPatient(Appointment appointment)
        {
            var currentUserId = User.GetUserId();
            var patientsIds = _dbContext.Patients.Where(p => p.AppUserId == currentUserId).Select(p => p.Id);
            return patientsIds.Any(patId => patId == appointment.PatientId);
        }
    }
}