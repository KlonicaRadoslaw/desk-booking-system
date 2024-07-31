using api.Models;
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
        }
    }
}
