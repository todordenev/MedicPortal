using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MedicPortal.Auth
{
    public interface IJwtFactory
    {
        string GenerateEncodedToken(IEnumerable<Claim> claims);
    }
}