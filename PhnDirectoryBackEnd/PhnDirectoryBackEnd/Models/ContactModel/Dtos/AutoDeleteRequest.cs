namespace PhnDirectoryBackEnd.Models.ContactModel.Dtos
{
        public class AutoDeleteRequest
        {
            public int? ContactsToDelete { get; set; }
            public int? DeleteIntervalMinutes { get; set; }
            public bool? DeleteOnlyInactive { get; set; }
        }


   
}
