using System.Collections.Generic;
using System.Linq;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Route("api/search")]
    [Authorize]
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public SearchController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET api/search
     

        [HttpGet("{term}")]
        public List<Doctor> GetSearch(string term)
        {
           var doctorsFoundByName = _dbContext.Doctors.Where(d => d.FirstName.Contains(term) || d.LastName.Contains(term));
            return doctorsFoundByName.ToList();
        }
    }
}