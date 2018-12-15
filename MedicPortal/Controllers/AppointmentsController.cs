using System;
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
    [Authorize]
    [ApiController]
    [Route("api/appointments")]
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

            var today0Hours = date.Date;
            var today24Hours = today0Hours.AddDays(1);
            var appointments = await _dbContext.Appointments.Include(a => a.Patient)
                .Where(a => a.DoctorId == doctorId && today0Hours < a.Start && a.Start < today24Hours)
                .Select(app => MaskIfNotAutorized(app, user))
                .ToListAsync();
            var dayofWeek = ((int) date.DayOfWeek - 1) % 7;

            var now = DateTime.Now;
            var serialAppointments = _dbContext.SerialAppointments
                .Where(a => a.DoctorId == doctorId && a.DayOfWeek == dayofWeek)
                .Where(a => a.StartDate < now && now < a.EndDate)
                .Select(a => ToAppointmentView(a, today0Hours));
            appointments.AddRange(serialAppointments);
            return Ok(appointments);
        }

        private AppointmentView ToAppointmentView(SerialAppointment serialAppointment, DateTime date)
        {
            var result = new AppointmentView();
            result.Title = serialAppointment.Title;
            result.DurationInMinutes = serialAppointment.DurationInMinutes;
            result.Start = date.AddHours(serialAppointment.From);
            return result;
        }

        [HttpGet("doctorappointments/{doctorId}/{date}")]
        public async Task<IActionResult> GetForDoctor(string doctorId, DateTime date)
        {
            var currentUserId = User.GetUserId();
            var user = _dbContext.Users.Include(u => u.Doctors)
                .First(u => u.Id == currentUserId);
            if (User.IsPortalAdmin() || user.Doctors.Any(d => d.Id == doctorId))
            {
                var from = date.Date;
                var till = from.AddDays(1);
                var appointments = await _dbContext.Appointments.Include(a => a.Patient)
                    .Where(a => a.DoctorId == doctorId && from < a.Start && a.Start < till)
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