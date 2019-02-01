﻿using System;
using System.Collections.Generic;
using System.Linq;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/new-patients")]
    public class NewPaitentController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Random _random;

        public NewPaitentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random(DateTime.Now.Millisecond);
        }

        [HttpPost]
        [Route("codes")]
        public IActionResult GetCodes([FromBody] string doctorId, int count)
        {
            if (User.HasClaim(RessourceClaimTypes.DoctorPermission, doctorId))
            {
                var codes = new List<string>();
                for (var i = 0; i < count; i++)
                {
                    var code = GenerateRandomCode();
                    codes.Add(code);
                    var registrationCode = new RegistrationCode
                        {Id = code, DoctorId = doctorId, Created = DateTime.Now, CreatedBy = User.GetUserId()};
                    _dbContext.RegistrationCodes.Add(registrationCode);
                }

                _dbContext.SaveChanges();
                return Ok(codes);
            }
            return Unauthorized();
        }

        private string GenerateRandomCode()
        {
            const string chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var chunkLength = 4;
            var chunk1 = new string(Enumerable.Repeat(chars, chunkLength).Select(s => s[_random.Next(s.Length)])
                .ToArray());
            var chunk2 = new string(Enumerable.Repeat(chars, chunkLength).Select(s => s[_random.Next(s.Length)])
                .ToArray());
            return $"{chunk1}-{chunk2}";
        }
    }
}