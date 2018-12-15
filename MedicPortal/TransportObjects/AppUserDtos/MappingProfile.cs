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
            CreateMap<AppUser, AppUserView>()
                .ForMember(vm => vm.AvatarImage, map => map.MapFrom(u => GetString(u.AvatarImage)));
        }

        private string GetString(byte[] value)
        {
            return Encoding.ASCII.GetString(value);
        }

        private byte[] GetBytes(string value)
        {
            return Encoding.ASCII.GetBytes(value);
        }
    }
}