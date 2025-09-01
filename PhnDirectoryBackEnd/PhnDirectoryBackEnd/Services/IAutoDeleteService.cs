using PhnDirectoryBackEnd.Models.ContactModel.Domain;

namespace PhnDirectoryBackEnd.Services
{
    public interface IAutoDeleteService
    {
        Task<AutoDeleteSettings> GetSettingsAsync();
        Task<AutoDeleteSettings> UpdateSettingsAsync(AutoDeleteSettings settings);
        Task ToggleAutoDeleteAsync(bool isEnabled);
    }
}
