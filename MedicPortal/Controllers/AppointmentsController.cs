using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.TransportObjects.AppointmentDtos;
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
        public IActionResult Post([FromBody] AppointmentCreate model)
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(string id)
        {
            var appointment = await _dbContext.Appointments.Include(ap => ap.Patient)
                .SingleOrDefaultAsync(ap => ap.Id == id);
            if (appointment == null)
            {
                return NotFound();
            }

            if (IsCurrentUserPatient(appointment))
            {
                appointment.IsCanceled = true;
                appointment.CanceledById = CurrentUserId;
                _dbContext.SaveChanges();
                return Ok();
            }

            return Unauthorized();
        }

        [HttpGet("doctor/{doctorId}/{date}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string doctorId, DateTime date)
        {
            var today0Hours = date.Date;
            var today24Hours = today0Hours.AddDays(1);
            var tempAppointments = await _dbContext.Appointments
                .Include(a => a.Patient)
                .Where(a => a.DoctorId == doctorId)
                .Where(a => today0Hours < a.Start && a.Start < today24Hours)
                .Where(a => !a.IsCanceled).ToListAsync();
                
            List<AppointmentView> appointments;

            if (User.HasClaim(PortalClaimTypes.DoctorManagePermission, doctorId))
            {
                appointments =  tempAppointments.Select(a=>_mapper.Map<AppointmentView>(a)).ToList();
            }
            else
            {
                appointments = tempAppointments.Select(MaskIfNotAutorized).ToList();
            }

            var dayofWeek = ((int) date.DayOfWeek - 1) % 7;

            var now = DateTime.Now;
            var serialAppointments = _dbContext.SerialAppointments
                .Where(a => a.DoctorId == doctorId && a.DayOfWeek == dayofWeek)
                .Where(a => a.StartDate < now && now < a.EndDate)
                .Select(a => ToAppointmentView(a, today0Hours));
            appointments.AddRange(serialAppointments);
            return Ok(appointments);
        }

        [HttpGet("foraccount")]
        public async Task<IActionResult> GetForAccount()
        {
            var currentUserId = User.GetUserId();
            var today = DateTime.Today;
            var appointmets = await _dbContext.Appointments
                .Where(a => a.Patient.AppUserId == currentUserId)
                .Where(a => a.Start > today)
                .Include(a => a.Patient)
                .Include(a => a.Doctor).ToListAsync();
            var appointmentView = appointmets.Select(a => _mapper.Map<AppointmentView>(a)).ToList();

            return Ok(appointmentView);
        }

        private AppointmentView ToAppointmentView(SerialAppointment serialAppointment, DateTime date)
        {
            var appointmentView = _mapper.Map<AppointmentView>(serialAppointment);
            appointmentView.Start = date.AddHours(serialAppointment.From);
            return appointmentView;
        }

        private AppointmentView MaskIfNotAutorized(Appointment app)
        {
            if (IsCurrentUserPatient(app))
            {
                return _mapper.Map<AppointmentView>(app);
            }

            return new AppointmentView {Start = app.Start, DurationInMinutes = app.DurationInMinutes};
        }

        private bool IsCurrentUserPatient(Appointment appointment)
        {
            return appointment.Patient.AppUserId == CurrentUserId;
        }
    }
}