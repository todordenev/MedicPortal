using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using MedicPortal.Controllers.Parameters;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/registration-codes")]
    public class NewPaitentController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly Random _random;

        public NewPaitentController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
            _random = new Random(DateTime.Now.Millisecond);
        }

        [HttpPost("{doctorId}/{count}")]
        public IActionResult GetCodes(string doctorId, int count)
        {
            if (User.HasClaim(PortalClaimTypes.DoctorManagePermission, doctorId))
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

        [HttpPost]
        [Route("apply")]
        public async Task<IActionResult> ApplyCode( [FromBody] RegistrationCodeParameter code)
        {
            var userId = User.GetUserId();
            var dbCode = await _dbContext.RegistrationCodes.FindAsync(code.Code);
            if (dbCode == null)
            {
                Trace.TraceWarning(
                    $"NewPaitentController.ApplyCode: User applies a not existing registration code. userId:{userId}");
                return BadRequest();
            }
            if (dbCode.IsUsed)
            {
                Trace.TraceWarning(
                    $"NewPaitentController.ApplyCode: User applies an allreasy used registration code. userId:{userId}");
                return BadRequest();
            }
            if (dbCode.DoctorId != code.DoctorId)
            {
                Trace.TraceWarning(
                    $"NewPaitentController.ApplyCode: User applies a registration code for other doctor. userId:{userId}");
                return BadRequest();
            }

            var makeAppointmens = new Claim(PortalClaimTypes.MakeAppointments, code.DoctorId);
            _dbContext.AddUserClaim(userId,makeAppointmens);

            return Ok();
        }


        private string GenerateRandomCode()
        {
            const string chars = "123456789ABCDEFHJKLMNPRSTUVWXYZ123456789";
            var chunkLength = 4;
            var chunk1 = new string(Enumerable.Repeat(chars, chunkLength).Select(s => s[_random.Next(s.Length)])
                .ToArray());
            var chunk2 = new string(Enumerable.Repeat(chars, chunkLength).Select(s => s[_random.Next(s.Length)])
                .ToArray());
            return $"{chunk1}-{chunk2}";
        }
    }
}