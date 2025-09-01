using AutoMapper;
using PhnDirectoryBackEnd.Models.ContactModel.Domain;
using PhnDirectoryBackEnd.Models.ContactModel.Dtos;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace PhnDirectoryBackEnd.Mapping
{
    public class ContactProfile : Profile
    {
        public ContactProfile()
        {
            CreateMap<CreateContactDto, Contact>();
            CreateMap<Contact, ContactDto>();
        }
    }
}
