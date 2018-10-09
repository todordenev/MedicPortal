using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace MedicPortal.Helpers
{
    public static class Errors
    {
        public static void AddErrors(this ModelStateDictionary modelState, IEnumerable<IdentityError> errors)
        {
            foreach (var e in errors)
            {
                modelState.AddError(e.Code, e.Description);
            }
        }

        public static void AddError(this ModelStateDictionary modelState, string code, string description)
        {
            modelState.TryAddModelError(code, description);
        }
    }
}