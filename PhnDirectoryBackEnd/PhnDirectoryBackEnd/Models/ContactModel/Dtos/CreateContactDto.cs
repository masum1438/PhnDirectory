using System.ComponentModel.DataAnnotations;

namespace PhnDirectoryBackEnd.Models.ContactModel.Dtos
{
    public class CreateContactDto
    {
        [Required, MaxLength(120)]
        public string Name { get; set; } = default!;

        [EmailAddress, MaxLength(160)]
        public string? Email { get; set; }

        [Required, MaxLength(32)]
        public string PhoneNumber { get; set; } = default!;

        [MaxLength(240)]
        public string? Address { get; set; }

        [MaxLength(100)]
        public string? Group { get; set; }

        public decimal Balance { get; set; } = 0m;
    }
}
