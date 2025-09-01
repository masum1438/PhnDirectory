using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PhnDirectoryBackEnd.Models.ContactModel.Domain;

namespace PhnDirectoryBackEnd.Data
{
    public class ApplicationDbContext:IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<Contact> Contacts => Set<Contact>();
        public DbSet<AutoDeleteSettings> AutoDeleteSettings => Set<AutoDeleteSettings>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var c = modelBuilder.Entity<Contact>();
            c.Property(x => x.Name).HasMaxLength(120).IsRequired();
            c.Property(x => x.Email).HasMaxLength(160);
            c.Property(x => x.PhoneNumber).HasMaxLength(32).IsRequired();
            c.Property(x => x.Address).HasMaxLength(240);
            c.Property(x => x.Group).HasMaxLength(100);
            c.Property(x => x.Status).HasDefaultValue(true);
            c.Property(x => x.Balance).HasColumnType("decimal(18,2)");
            c.Property(x => x.CreatedAt).HasDefaultValueSql("GETUTCDATE()");

            var s = modelBuilder.Entity<AutoDeleteSettings>();
            s.Property(x => x.DeleteIntervalMinutes).HasDefaultValue(5);
            s.Property(x => x.ContactsToDelete).HasDefaultValue(10);
            s.Property(x => x.IsEnabled).HasDefaultValue(false);
            s.Property(x => x.DeleteOnlyInactive).HasDefaultValue(false);
        }
    }
}
