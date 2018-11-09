using System.Text;
using AutoMapper;
using MedicPortal.Data.Models;

namespace MedicPortal.ViewModels.Mappers
{
    public class ViewModelToEntityMappingProfile : Profile
    {
        public ViewModelToEntityMappingProfile()
        {
            CreateMap<RegistrationViewModel, AppUser>().ForMember(au => au.AvatarImage,
                    map => map.MapFrom(vm => GetBytes(vm.AvatarImageSrc)))
                .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
            CreateMap<DoctorViewModel, Doctor>();
            CreateMap<WorktimeViewModel, Worktime>();
            CreateMap<PatientViewModel, Patient>();
        }

        private byte[] GetBytes(string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }
    }
}