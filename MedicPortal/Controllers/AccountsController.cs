using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.TransportObjects.AppUserDtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public AccountsController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            ApplicationDbContext dbContext,
            SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _dbContext = dbContext;
            _signInManager = signInManager;
        }

        // POST api/accounts/register
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] AppUserCreate model)
        {
            if (!ModelState.IsValid)
            {
                Trace.TraceWarning("AccountsController.Register: ModelState is not valid.");
                return BadRequest(ModelState);
            }

            var appUser = _mapper.Map<AppUser>(model);
            var userName = appUser.UserName;

            var createdResult = await _userManager.CreateAsync(appUser, model.Password);
            if (!createdResult.Succeeded)
            {
                Trace.TraceError(
                    $"AccountsController.Register: User could not be saved. Login:{userName} Password:{model.Password}");
                ModelState.AddErrors(createdResult.Errors);
                return BadRequest(ModelState);
            }

            var user = _dbContext.Users.First(u => u.UserName == model.Email);
            _dbContext.CreatePatientOnRegistration(user);
            return await Login(userName, model.Password);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> OnLogin([FromBody] AppUserCredential credentials)
        {
            return await Login(credentials.UserName, credentials.Password);
        }

        private async Task<IActionResult> Login(string userName, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(userName, password, true, false);
            if (!result.Succeeded)
            {
                Trace.TraceWarning($"AccountsController.Login: User cannot login. user:{userName}");
                ModelState.AddError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            return Ok();
        }

        [HttpGet]
        [Route("getuserinfo")]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.GetUserId();
            var user = await _dbContext.Users.FindAsync(userId);
            if (user == null)
            {
                return Unauthorized();
            }

            var userVm = GetUserInfo(user);
            return Ok(userVm);
        }

        private AppUserView GetUserInfo(AppUser user)
        {
            var userVm = _mapper.Map<AppUserView>(user);
            userVm.Roles = User.Claims.Where(cl => cl.Type == ClaimTypes.Role).Select(cl => cl.Value).ToList();
            userVm.Claims = User.Claims.Where(cl => cl.Type == PortalClaimTypes.MakeAppointments).ToList();
            return userVm;
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }
    }
}