﻿using FluentValidation;
using MedicPortal.TransportObjects.AppUserDtos;

namespace MedicPortal.ViewModels.Validators
{
    public class RegistrationViewModelValidator : AbstractValidator<AppUserCreate>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm => vm.Email).NotEmpty().WithMessage("Email cannot be empty");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Password cannot be empty");
            RuleFor(vm => vm.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
            RuleFor(vm => vm.LastName).NotEmpty().WithMessage("LastName cannot be empty");
        }
    }
}