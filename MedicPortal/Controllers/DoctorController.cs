using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.TransportObjects.DoctorDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Route("api/doctors")]
    [ApiController]
    [Authorize]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public DoctorController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public List<DoctorView> Get()
        {
            var doctors = _dbContext.Doctors.Where(d => d.IsActive && d.Approved)
                .Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations)
                .ThenInclude(ds => ds.Spezialisation)
                .Select(d => _mapper.Map<DoctorView>(d))
                .ToList();
            return doctors;
        }

        // GET api/doctors/mydoctors
        [HttpGet]
        [Route("mydoctors")]
        [Authorize(Roles = "Admin,Doctor")]
        public List<DoctorView> GetMyDoctors()
        {
            var myDoctorIds = User.Claims.Where(c => c.Type == RessourceClaimTypes.DoctorPermission)
                .Select(cl => cl.Value).ToList();
            if (myDoctorIds.Any())
            {
                var doctors = _dbContext.Doctors
                    .Where(d => d.IsActive && d.Approved)
                    .Include(d => d.Worktimes)
                    .Where(d => myDoctorIds.Contains(d.Id));
                var doctorsTo = doctors.Select(d => _mapper.Map<DoctorView>(d)).ToList();
                return doctorsTo;
            }

            return new List<DoctorView>();
        }

        // GET api/doctors/5
        [HttpGet("{id}")]
        public ActionResult<DoctorView> Get(string id)
        {
            if (id.IsNullOrEmpty())
            {
                return BadRequest();
            }

            var doctor = _dbContext.Doctors
                .Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations)
                .ThenInclude(ds => ds.Spezialisation)
                .Select(d => _mapper.Map<DoctorView>(d))
                .FirstOrDefault(d => d.Id == id);
            if (doctor == null)
            {
                NotFound();
            }

            return doctor;
        }

        [HttpPost]
        public Doctor Post([FromBody] DoctorCreate model)
        {
            var doc = _mapper.Map<Doctor>(model);


            _dbContext.Doctors.Add(doc);
            _dbContext.SaveChanges();

            return doc;
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Patch(string id, [FromBody] JsonPatchDocument<Doctor> doctorPatch)
        {
            var doctor = await _dbContext.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            if (doctorPatch.Operations.Any())
            {
                doctorPatch.ApplyTo(doctor);
                _dbContext.Update(doctor);
                _dbContext.SaveChanges();
            }

            return Ok(doctor);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var doctor = await _dbContext.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }


            doctor.IsActive = false;
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}