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
    [Route("api/manager")]
    [Authorize]
    public class ManagerController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public ManagerController(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        // GET api/doctor
        [HttpGet]
        public List<Doctor> Get()
        {
            return _dbContext.Doctors.ToList();
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