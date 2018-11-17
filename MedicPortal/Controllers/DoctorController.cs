using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.ViewModels;
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
        public List<Doctor> Get()
        {
            var doctors = _dbContext.Doctors.Where(d => d.IsActive && d.Approved)
                .Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations)
                .ThenInclude(ds => ds.Spezialisation)
                .ToList();
            return doctors;
        }

        // GET api/doctors
        [HttpGet]
        [Route("foraccount")]
        public List<Doctor> GetMyDoctors()
        {
            var userId = User.GetUserId();
            var doctors = _dbContext.Doctors.Where(d => d.AppUserId == userId).Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations).ThenInclude(ds => ds.Spezialisation).ToList();
            return doctors;
        }

        // GET api/doctors/5
        [HttpGet("{id}")]
        public ActionResult<Doctor> Get(string id)
        {
            if (id.IsNullOrEmpty())
            {
                return BadRequest();
            } 

            var doctor = _dbContext.Doctors
                .Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations)
                .ThenInclude(ds => ds.Spezialisation)
                .FirstOrDefault(d => d.Id == id);
            if (doctor == null)
            {
                NotFound();
            }

            return doctor;
        }

        [HttpPost]
        public Doctor Post([FromBody] DoctorViewModel model)
        {
            var doc = _mapper.Map<Doctor>(model);
            doc.AppUserId = User.GetUserId();

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

            if (doctor.AppUserId != User.GetUserId())
            {
                return BadRequest();
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

            if (doctor.AppUserId != User.GetUserId())
            {
                return BadRequest();
            }

            _dbContext.Doctors.Remove(doctor);
            _dbContext.SaveChanges();

            return Ok();
        }
    }
}