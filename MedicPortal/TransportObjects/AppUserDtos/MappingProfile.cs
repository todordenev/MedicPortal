using System.Text;
using AutoMapper;
using MedicPortal.Data.Models;

namespace MedicPortal.TransportObjects.AppUserDtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUserCreate, AppUser>()
                .ForMember(au => au.AvatarImage,
                    map => map.MapFrom(vm => GetBytes(vm.AvatarImageSrc)))
                .ForMember(au => au.UserName, map => map.MapFrom(vm => vm.Email));
            CreateMap<AppUser, AppUserView>();
        }

        private byte[] GetBytes(string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }
    }
}