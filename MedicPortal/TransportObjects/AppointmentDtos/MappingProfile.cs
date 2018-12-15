using AutoMapper;
using MedicPortal.Data.Models;
using MedicPortal.TransportObjects.DoctorDtos;

namespace MedicPortal.TransportObjects.AppointmentDtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppointmentCreate, Appointment>();
            CreateMap<Appointment, AppointmentView>()
                .ForMember(app => app.Title,
                    map => map.MapFrom(vm => vm.Patient.FirstName + " " + vm.Patient.LastName));
            CreateMap<SerialAppointment, AppointmentView>();
        }
    }
}