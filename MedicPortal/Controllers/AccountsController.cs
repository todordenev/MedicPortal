using System.Linq;
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
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace MedicPortal.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]/[action]")]
    public class AccountsController : Controller
    {
        private readonly ApplicationDbContext _appDbContext;
        private readonly IJwtFactory _jwtFactory;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly IMapper _mapper;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly UserManager<AppUser> _userManager;

        public AccountsController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            ApplicationDbContext appDbContext,
            IJwtFactory jwtFactory,
            SignInManager<AppUser> signInManager,
            IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
            _jwtFactory = jwtFactory;
            _signInManager = signInManager;
            _jwtOptions = jwtOptions.Value;
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        // POST api/accounts/register
        [HttpPost]
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

            var signInResult =
                await _signInManager.PasswordSignInAsync(appUser.UserName, model.Password, true, false);
            if (!signInResult.Succeeded)
            {
                return BadRequest(ModelState);
            }

            var token = await GetUserToken(userName);

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
            
            var token = await GetUserToken(credentials.UserName);

            return Ok(token);
        }

        private async Task<object> GetUserToken(string userName)
        {
            var user = await _userManager.FindByEmailAsync(userName);

            var claimsIdentity = _jwtFactory.GenerateClaimsIdentity(userName, user.Id);
            var token = new
            {
                id = claimsIdentity.Claims.Single(c => c.Type == "id").Value,
                auth_token = await _jwtFactory.GenerateEncodedToken(userName, claimsIdentity),
                expires_in = (int) _jwtOptions.ValidFor.TotalSeconds,
                user = $"{user.FirstName} {user.LastName}"
            };
            return token;
        }
    }
}