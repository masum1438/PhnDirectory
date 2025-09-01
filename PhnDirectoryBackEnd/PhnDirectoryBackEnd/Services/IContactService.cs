using PhnDirectoryBackEnd.Models.ContactModel.Dtos;

namespace PhnDirectoryBackEnd.Services
{
    public interface IContactService
    {
        Task<ContactDto?> GetContactAsync(int id);
        Task<IEnumerable<ContactDto>> GetAllContactsAsync();
        Task<ContactDto> CreateContactAsync(CreateContactDto contactDto);
        Task<ContactDto?> UpdateContactAsync(int id, CreateContactDto contactDto);
        Task DeleteContactAsync(int id);
        Task ToggleContactStatusAsync(int id);
        Task BulkInsertContactsAsync(IEnumerable<CreateContactDto> contactDtos);
        Task BulkDeleteContactsAsync(IEnumerable<int> ids);
        Task BulkDisableContactsAsync(IEnumerable<int> ids);
        Task<List<int>> GetNextDeletableContactIdsAsync(int count, bool onlyInactive = false);
    }
}
