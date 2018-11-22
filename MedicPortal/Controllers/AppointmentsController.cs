using System;
using System.Linq;
using System.Threading.Tasks;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
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

        public AppointmentsController(ApplicationDbContext appDbContext)
        {
            _dbContext = appDbContext;
        }

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

        [HttpGet]
        [AllowAnonymous]
        public DateTime Get()
        {
            return DateTime.Now;
        }

        [HttpGet("for/{date}")]
        [AllowAnonymous]
        public DateTime GetFor(DateTime date)
        {
            return DateTime.Now;
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