using FluentValidation;
using MedicPortal.TransportObjects.AppUserDtos;
using Microsoft.Extensions.DependencyInjection;

namespace MedicPortal.ViewModels.Validators
{
    public static class ValidatorsExt
    {
        public static void AddValidators(this IServiceCollection services)
        {
            services.AddTransient<IValidator<AppUserCreate>, RegistrationViewModelValidator>();
            services.AddTransient<IValidator<LoginViewModel>, LoginViewModelValidator>();
        }
    }
}