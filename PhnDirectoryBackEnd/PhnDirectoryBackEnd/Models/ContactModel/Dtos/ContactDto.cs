namespace PhnDirectoryBackEnd.Models.ContactModel.Dtos
{
    public class ContactDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string? Email { get; set; }
        public string PhoneNumber { get; set; } = default!;
        public string? Address { get; set; }
        public string? Group { get; set; }
        public bool Status { get; set; } = true;
        public decimal Balance { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}
