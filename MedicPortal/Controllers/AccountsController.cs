using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Auth;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IJwtFactory _jwtFactory;

        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public AccountsController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            ApplicationDbContext appDbContext,
            IJwtFactory jwtFactory,
            SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _signInManager = signInManager;
        }

        // POST api/accounts/register
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var appUser = _mapper.Map<AppUser>(model);
            var userName = appUser.UserName;

            var createdResult = await _userManager.CreateAsync(appUser, model.Password);
            if (!createdResult.Succeeded)
            {
                ModelState.AddErrors(createdResult.Errors);
                return BadRequest(ModelState);
            }

            var signInResult =
                await _signInManager.PasswordSignInAsync(appUser.UserName, model.Password, true, false);
            if (!signInResult.Succeeded) return BadRequest(ModelState);

            var token = await GetAuthorizationToken(userName);

            return Ok(token);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel credentials)
        {
            var result =
                await _signInManager.PasswordSignInAsync(credentials.UserName, credentials.Password, true, false);
            if (!result.Succeeded)
            {
                ModelState.AddError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            var token = await GetAuthorizationToken(credentials.UserName);

            return Ok(token);
        }

        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        private async Task<object> GetAuthorizationToken(string userName)
        {
            var user = _appDbContext.Users.First(u => u.UserName == userName);
            var userClaims = user.GetUserClaims();
            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                userClaims.Add(new Claim(Constants.JwtClaimIdentifiers.Rol, role));
            }

            var token = new
            {
                auth_token = _jwtFactory.GenerateEncodedToken(userClaims)
            };
            return token;
        }
    }
}