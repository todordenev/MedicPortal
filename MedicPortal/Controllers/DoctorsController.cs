using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Route("api/doctors")]
    public class DoctorsController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public DoctorsController(ApplicationDbContext dbContext,IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        private static readonly string[] Summaries =
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        // GET api/doctors
        [HttpGet]
        public List<Doctor> Get()
        {
            return _dbContext.Doctors.ToList();
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

        // POST api/doctors
        [HttpPost]
        public IActionResult Post([FromBody] DoctorViewModel value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            var doctor = _mapper.Map<Doctor>(value);
            _dbContext.Update(doctor);
            _dbContext.SaveChanges();
            return Ok(doctor);
        }
    }
}