using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PhnDirectoryBackEnd.FileHandlers;
using PhnDirectoryBackEnd.Models.ContactModel.Dtos;
using PhnDirectoryBackEnd.Services;

namespace PhnDirectoryBackEnd.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : Controller
    {
        private readonly IContactService _contactService;
        private readonly ILogger<ContactController> _logger;
        private readonly IAutoDeleteService _autoDeleteService;

        public ContactController(IContactService contactService, IAutoDeleteService autoDeleteService,
            ILogger<ContactController> logger)
        {
            _contactService = contactService;
            _autoDeleteService = autoDeleteService;
            _logger = logger;
        }

        // PUBLIC READ (Authenticated)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactDto>>> GetAll()
        {
            var contacts = await _contactService.GetAllContactsAsync();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ContactDto>> Get(int id)
        {
            var contact = await _contactService.GetContactAsync(id);
            if (contact == null)
            {
                _logger.LogWarning("Contact not found: {Id}", id);
                return NotFound();
            }
            return Ok(contact);
        }

        // ADMIN - Create
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ContactDto>> Create(CreateContactDto contactDto)
        {
            var contact = await _contactService.CreateContactAsync(contactDto);
            _logger.LogInformation("Contact created: {Id}", contact.Id);
            return CreatedAtAction(nameof(Get), new { id = contact.Id }, contact);
        }

        // ADMIN - Update
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, CreateContactDto contactDto)
        {
            var contact = await _contactService.UpdateContactAsync(id, contactDto);
            if (contact == null)
            {
                _logger.LogWarning("Contact not found for update: {Id}", id);
                return NotFound();
            }
            _logger.LogInformation("Contact updated: {Id}", id);
            return NoContent();
        }

        // ADMIN - Delete
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            await _contactService.DeleteContactAsync(id);
            _logger.LogInformation("Contact deleted: {Id}", id);
            return NoContent();
        }

        // ADMIN - Toggle disable/enable
        [HttpPatch("{id}/disable")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Disable(int id)
        {
            await _contactService.ToggleContactStatusAsync(id);
            _logger.LogInformation("Contact status toggled: {Id}", id);
            return NoContent();
        }

        // ADMIN - Bulk Insert
        [HttpPost("bulk")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BulkInsert([FromBody] IEnumerable<CreateContactDto> contactDtos)
        {
            await _contactService.BulkInsertContactsAsync(contactDtos);
            _logger.LogInformation("Bulk insert completed: {Count} contacts", contactDtos.Count());
            return Ok(new { Message = $"Successfully inserted {contactDtos.Count()} contacts" });
        }

        // ADMIN - Bulk Delete by range [startId, endId]
        [HttpDelete("bulk")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BulkDelete([FromBody] List<int> range)
        {
            if (range == null || range.Count != 2 || range[0] > range[1])
                return BadRequest("Invalid range. Provide [startId, endId].");

            var ids = Enumerable.Range(range[0], range[1] - range[0] + 1).ToList();
            await _contactService.BulkDeleteContactsAsync(ids);

            _logger.LogInformation("Bulk delete completed: {Count} contacts", ids.Count);
            return Ok(new { Message = $"Successfully deleted {ids.Count} contacts" });
        }

        // ADMIN - Bulk Disable by range [startId, endId]
        [HttpPatch("bulk/disable")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BulkDisable([FromBody] List<int> range)
        {
            if (range == null || range.Count != 2 || range[0] > range[1])
                return BadRequest("Invalid range. Provide [startId, endId].");

            var ids = Enumerable.Range(range[0], range[1] - range[0] + 1).ToList();
            await _contactService.BulkDisableContactsAsync(ids);

            _logger.LogInformation("Bulk disable completed: {Count} contacts", ids.Count);
            return Ok(new { Message = $"Successfully disabled {ids.Count} contacts" });
        }

        // ADMIN - Import Excel
        [HttpPost("import")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Import(IFormFile file, [FromServices] FileHandler fileHandler)
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file uploaded.");

            using var stream = file.OpenReadStream();
            var contacts = fileHandler.ParseExcelFile(stream);
            await _contactService.BulkInsertContactsAsync(contacts);

            _logger.LogInformation("Contacts imported from file: {Count}", contacts.Count());
            return Ok(new { Message = $"Successfully imported {contacts.Count()} contacts" });
        }

        // ADMIN - Export Excel
        [HttpGet("export")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Export([FromServices] FileHandler fileHandler)
        {
            var contacts = await _contactService.GetAllContactsAsync();
            var stream = fileHandler.GenerateExcelFile(contacts);

            _logger.LogInformation("Contacts exported to file: {Count}", contacts.Count());
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Contacts.xlsx");
        }

        // ADMIN - API-triggered auto delete

        [HttpPost("bulk-delete-auto")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ConfigureAutoDelete([FromBody] AutoDeleteRequest request)
        {
            var settings = await _autoDeleteService.GetSettingsAsync();

            settings.ContactsToDelete = request.ContactsToDelete ?? settings.ContactsToDelete;
            settings.DeleteIntervalMinutes = request.DeleteIntervalMinutes ?? settings.DeleteIntervalMinutes;
            settings.DeleteOnlyInactive = request.DeleteOnlyInactive ?? settings.DeleteOnlyInactive;

            await _autoDeleteService.UpdateSettingsAsync(settings);

            _logger.LogInformation("Auto-delete settings updated: {Count} contacts every {Minutes} minutes",
                settings.ContactsToDelete, settings.DeleteIntervalMinutes);

            return Ok(new
            {
                Message = $"Auto-delete configured to delete {settings.ContactsToDelete} contacts every {settings.DeleteIntervalMinutes} minutes.",
                settings.IsEnabled,
                settings.ContactsToDelete,
                settings.DeleteIntervalMinutes,
                settings.DeleteOnlyInactive
            });
        }


        [HttpPost("toggle/{isEnabled}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ToggleAutoDelete(bool isEnabled)
        {
            await _autoDeleteService.ToggleAutoDeleteAsync(isEnabled);
            return Ok(new
            {
                Message = $"Auto-delete has been {(isEnabled ? "enabled" : "disabled")}",
                IsEnabled = isEnabled
            });
        }
    }
}
