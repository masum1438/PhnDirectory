using ClosedXML.Excel;
using PhnDirectoryBackEnd.Models.ContactModel.Dtos;

namespace PhnDirectoryBackEnd.FileHandlers
{
    public class FileHandler
    {
        public IEnumerable<CreateContactDto> ParseExcelFile(Stream excelStream)
        {
            using var wb = new XLWorkbook(excelStream);
            var ws = wb.Worksheet(1);

            var rows = ws.RangeUsed().RowsUsed().Skip(1); // skip header
            var list = new List<CreateContactDto>();

            foreach (var row in rows)
            {
                var dto = new CreateContactDto
                {
                    Name = row.Cell(1).GetString().Trim(),
                    Email = string.IsNullOrWhiteSpace(row.Cell(2).GetString()) ? null : row.Cell(2).GetString().Trim(),
                    PhoneNumber = row.Cell(3).GetString().Trim(),
                    Address = string.IsNullOrWhiteSpace(row.Cell(4).GetString()) ? null : row.Cell(4).GetString().Trim(),
                    Group = string.IsNullOrWhiteSpace(row.Cell(5).GetString()) ? null : row.Cell(5).GetString().Trim(),
                    Balance = row.Cell(6).TryGetValue<decimal>(out var bal) ? bal : 0m
                };

                if (!string.IsNullOrWhiteSpace(dto.Name) && !string.IsNullOrWhiteSpace(dto.PhoneNumber))
                    list.Add(dto);
            }

            return list;
        }

        public MemoryStream GenerateExcelFile(IEnumerable<ContactDto> contacts)
        {
            var ms = new MemoryStream();
            using (var wb = new XLWorkbook())
            {
                var ws = wb.Worksheets.Add("Contacts");
                // Header
                ws.Cell(1, 1).Value = "Id";
                ws.Cell(1, 2).Value = "Name";
                ws.Cell(1, 3).Value = "Email";
                ws.Cell(1, 4).Value = "PhoneNumber";
                ws.Cell(1, 5).Value = "Address";
                ws.Cell(1, 6).Value = "Group";
                ws.Cell(1, 7).Value = "Status";
                ws.Cell(1, 8).Value = "Balance";
                ws.Cell(1, 9).Value = "CreatedAt";
                ws.Cell(1, 10).Value = "UpdatedAt";

                int r = 2;
                foreach (var c in contacts)
                {
                    ws.Cell(r, 1).Value = c.Id;
                    ws.Cell(r, 2).Value = c.Name;
                    ws.Cell(r, 3).Value = c.Email ?? "";
                    ws.Cell(r, 4).Value = c.PhoneNumber;
                    ws.Cell(r, 5).Value = c.Address ?? "";
                    ws.Cell(r, 6).Value = c.Group ?? "";
                    ws.Cell(r, 7).Value = c.Status ? "Active" : "Inactive";
                    ws.Cell(r, 8).Value = c.Balance;
                    ws.Cell(r, 9).Value = c.CreatedAt;
                    ws.Cell(r, 10).Value = c.UpdatedAt?.ToString("u") ?? "";
                    r++;
                }

                ws.Columns().AdjustToContents();
                wb.SaveAs(ms);
            }
            ms.Position = 0;
            return ms;
        }
    }
}
