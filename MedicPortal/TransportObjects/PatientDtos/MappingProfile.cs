using System.Text;
using AutoMapper;
using MedicPortal.Data.Models;

namespace MedicPortal.TransportObjects.PatientDtos
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<PatientCreate, Patient>();
        }

    }
}