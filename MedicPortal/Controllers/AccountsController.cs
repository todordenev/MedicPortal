using System.Linq;
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
    [Produces("application/json")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;

        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public AccountsController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            ApplicationDbContext appDbContext,
            SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
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
                return BadRequest(ModelState);
            }

            var appUser = _mapper.Map<AppUser>(model);
            var userName = appUser.UserName;

            var createdResult = await _userManager.CreateAsync(appUser, model.Password);
            if (!createdResult.Succeeded)
            {
                ModelState.AddErrors(createdResult.Errors);
                return BadRequest(ModelState);
            }
            return await OnLogin(userName, model.Password);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> OnLogin([FromBody] AppUserCredential credentials)
        {
            return await OnLogin(credentials.UserName, credentials.Password);
        }

        private async Task<IActionResult> OnLogin(string userName, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(userName, password, true, false);
            if (!result.Succeeded)
            {
                ModelState.AddError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            var user = _appDbContext.Users.First(u => u.UserName == userName);
            var userVm = GetUserInfo(user);
            return Ok(userVm);
        }

        [HttpGet]
        [Route("getuserinfo")]
        public async Task<IActionResult> GetUser()
        {
            var userId = User.GetUserId();
            var user = await _appDbContext.Users.FindAsync(userId);
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
            foreach (var roleId in _appDbContext.UserRoles.Where(ur => ur.UserId == user.Id).Select(ur => ur.RoleId))
            {
                userVm.Roles.Add(_appDbContext.Roles.Find(roleId).Name);
            }
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