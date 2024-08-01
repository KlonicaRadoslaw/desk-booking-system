using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class TestContextFactory
{
    public static async Task<ApplicationDbContext> GetTestDatabaseContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new ApplicationDbContext(options);
        context.Database.EnsureCreated();

        if (!await context.Reservations.AnyAsync())
        {
            context.Reservations.Add(new Reservation
            {
                Id = 1,
                AppUserId = "02837bed-d7eb-4471-a986-396e5878efb9",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(1)
            });
            context.Reservations.Add(new Reservation
            {
                Id = 2,
                AppUserId = "02837bed-d7eb-4471-a986-396e5878efb9",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(1)
            });
            await context.SaveChangesAsync();
        }

        return context;
    }
}
