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
        public IActionResult Post([FromBody] AppointmentViewModelCreation model)
        {
            var appointment = _mapper.Map<Appointment>(model);
            appointment.ConfirmedByDoctor = model.DoctorId == CurrentUserId;
            appointment.ConfirmedByUser =
                _dbContext.Patients.Any(p => p.AppUserId == CurrentUserId && p.Id == model.PatientId);

            if (User.IsPortalAdmin() || appointment.ConfirmedByDoctor || appointment.ConfirmedByUser)
            {
                _dbContext.Appointments.Add(appointment);
                _dbContext.SaveChanges();
            }

            return Unauthorized();
        }


        [HttpGet("doctor/{doctorId}/{date}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(string doctorId, DateTime date)
        {
            var from = date.Date;
            var till = from.AddDays(1);
            var appointments = await _dbContext.Appointments
                .Where(a => a.DoctorId == doctorId && a.Start > from && a.Start < till)
                .ToListAsync();
            return Ok(appointments);
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