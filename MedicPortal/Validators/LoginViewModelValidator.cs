using FluentValidation;
using MedicPortal.TransportObjects.AppUserDtos;

namespace MedicPortal.Validators
{
    public class LoginViewModelValidator : AbstractValidator<AppUserCredential>
    {
        public LoginViewModelValidator()
        {
            RuleFor(vm => vm.UserName).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
        }
    }
}