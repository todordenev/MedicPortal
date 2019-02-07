using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.TransportObjects.PatientDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Route("api/patients")]
    [ApiController]
    [Authorize]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public PatientController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public List<Patient> Get()
        {
            var userId = User.GetUserId();
            var patients = _dbContext.Patients
                .Include(p => p.AppUser)
                .Where(p => p.AppUserId == userId)
                .Where(p => !p.IsDeleted).ToList();

            return patients.ToList();
        }

        [HttpPost]
        public Patient Post([FromBody] PatientCreate model)
        {
            var patient = _mapper.Map<Patient>(model);
            patient.AppUserId = User.GetUserId();

            _dbContext.Patients.Add(patient);
            _dbContext.SaveChanges();

            return patient;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(string id, [FromBody] JsonPatchDocument<Patient> patientPatch)
        {
            var patient = await _dbContext.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            if (patient.AppUserId != User.GetUserId())
            {
                return BadRequest();
            }

            if (patientPatch.Operations.Any())
            {
                patientPatch.ApplyTo(patient);
                _dbContext.Update(patient);
                _dbContext.SaveChanges();
            }

            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var patient = await _dbContext.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            if (!User.IsPortalAdmin() && User.HasClaim(PortalClaimTypes.PatientManagePermission, id))
            {
                return Unauthorized();
            }

            var appointments = _dbContext.Appointments.Where(a => a.PatientId == id);
            if (appointments.Any())
            {
                foreach (var appointment in appointments)
                {
                    appointment.Canceled = true;
                    appointment.CanceledById = User.GetUserId();
                }
            }

            patient.IsDeleted = true;
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}