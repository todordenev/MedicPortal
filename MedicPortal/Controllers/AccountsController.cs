using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using MedicPortal.Auth;
using MedicPortal.Data;
using MedicPortal.Data.Models;
using MedicPortal.Helpers;
using MedicPortal.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/accounts")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IJwtFactory _jwtFactory;

        private readonly IMapper _mapper;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public AccountsController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            ApplicationDbContext appDbContext,
            IJwtFactory jwtFactory,
            SignInManager<AppUser> signInManager,
            IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _signInManager = signInManager;
            _httpContextAccessor = httpContextAccessor;
        }

        // POST api/accounts/register
        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationViewModel model)
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

            return await OnLogin(userName);
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel credentials)
        {
            return await Login(credentials.UserName, credentials.Password);
        }

        private async Task<IActionResult> Login(string userName, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(userName, password, true, false);
            if (!result.Succeeded)
            {
                ModelState.AddError("login_failure", "Invalid username or password.");
                return BadRequest(ModelState);
            }

            return await OnLogin(userName);
        }

        private async Task<IActionResult> OnLogin(string userName)
        {
            var jwt = await GetAuthorizationToken(userName);
            //_httpContextAccessor.HttpContext.Response.Cookies.Append("Authorization", "Bearer " + jwt);
            _httpContextAccessor.HttpContext.Response.Headers.Add("Authorization","Bearer " + jwt);
            var token = new
            {
                auth_token = jwt
            };
            return Ok(token);
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        //api/accounts/avatarimage
        [HttpGet]
        [Route("avatarimage")]
        public async Task<IActionResult> GetAvatarImage()
        {
            var userId = User.GetUserId();
            var user = await _appDbContext.Users.FindAsync(userId);
            var someString = Encoding.ASCII.GetString(user.AvatarImage);
            return Ok(someString);
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

            return _jwtFactory.GenerateEncodedToken(userClaims);
        }
    }
}