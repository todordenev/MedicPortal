using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Route("api/doctors")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private IMapper _mapper;

        public DoctorController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        [HttpGet]
        public List<Doctor> Get()
        {
            var doctors = _dbContext.Doctors.Include(d => d.Worktimes)
                .Include(d => d.DoctorSpezialisations).ThenInclude(ds=>ds.Spezialisation).ToList();
            
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

            var doctor = _dbContext.Doctors.FirstOrDefault(d => d.Id == id);
            if (doctor == null)
            {
                NotFound();
            }

            return doctor;
        }
    }
}