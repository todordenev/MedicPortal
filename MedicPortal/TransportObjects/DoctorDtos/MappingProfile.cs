using System.Linq;
using AutoMapper;
using MedicPortal.Data.Models;

namespace MedicPortal.TransportObjects.DoctorDtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<DoctorCreate, Doctor>();
            CreateMap<Doctor, DoctorView>()
                .ForMember(d => d.Specialisations,
                    map => map.MapFrom(
                        d => d.DoctorSpezialisations.Select(dspec => dspec.Spezialisation.Name)));
            CreateMap<Worktime, WorktimeView>();
        }
    }
}