namespace PhnDirectoryBackEnd.Models.ContactModel.Domain
{
    public class AutoDeleteSettings
    {
        public int Id { get; set; } = 1;

        public bool IsEnabled { get; set; } 

        // Interval (minutes) for scheduled deletion
        public int DeleteIntervalMinutes { get; set; } = 5;

        // Number of contacts to delete each cycle / trigger
        public int ContactsToDelete { get; set; } = 10;

        // If true: only delete inactive contacts
        public bool DeleteOnlyInactive { get; set; } = false;
    }
}
