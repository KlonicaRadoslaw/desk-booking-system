using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Location> Locations { get; set; }
        public DbSet<Desk> Desks { get; set; }
        public DbSet<Reservation> Reservations { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Location>()
                .HasMany(l => l.Desks)
                .WithOne(d => d.Location)
                .HasForeignKey(d => d.LocationId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Desk>()
                .HasMany(d => d.Reservations)
                .WithOne(r => r.Desk)
                .HasForeignKey(r => r.DeskId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Reservation>()
                .HasOne(r => r.AppUser)
                .WithMany(u => u.Reservations)
                .HasForeignKey(r => r.AppUserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Desk>()
                .Property(d => d.IsAvailable)
                .IsRequired();

            modelBuilder.Entity<Reservation>()
                .HasKey(r => new { r.AppUserId, r.DeskId, r.StartDate });

            modelBuilder.Entity<Reservation>()
                .HasIndex(r => new { r.DeskId, r.StartDate, r.EndDate })
                .IsUnique();

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole()
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole()
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            modelBuilder.Entity<IdentityRole>().HasData(roles);

            modelBuilder.Entity<Location>().HasData(
            new Location { Id = 1, Name = "Floor 1" },
            new Location { Id = 2, Name = "Floor 2" },
            new Location { Id = 3, Name = "Floor 3" }
            );

            modelBuilder.Entity<Desk>().HasData(
               new Desk { Id = 1, LocationId = 1, Name = "Desk 1", IsAvailable = true },
               new Desk { Id = 2, LocationId = 1, Name = "Desk 2", IsAvailable = true },
               new Desk { Id = 3, LocationId = 1, Name = "Desk 3", IsAvailable = false },
               new Desk { Id = 4, LocationId = 2, Name = "Desk 4", IsAvailable = true },
               new Desk { Id = 5, LocationId = 2, Name = "Desk 5", IsAvailable = true },
               new Desk { Id = 6, LocationId = 2, Name = "Desk 6", IsAvailable = false },
               new Desk { Id = 7, LocationId = 3, Name = "Desk 7", IsAvailable = true },
               new Desk { Id = 8, LocationId = 3, Name = "Desk 8", IsAvailable = true },
               new Desk { Id = 9, LocationId = 3, Name = "Desk 9", IsAvailable = true }
           );
        }
    }
}
