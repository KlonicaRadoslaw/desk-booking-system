using api.Data;
using api.Dtos.Location;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class LocationRepository : ILocationRepository
    {
        private readonly ApplicationDbContext _context;

        public LocationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Location> CreateAsync(Location locationModel)
        {
            await _context.Locations.AddAsync(locationModel);
            await _context.SaveChangesAsync();
            return locationModel;
        }

        public async Task<Location?> DeleteAsync(int id)
        {
            var locationModel = _context.Locations.FirstOrDefault(x => x.Id == id);
            if (locationModel == null)
                return null;

            _context.Locations.Remove(locationModel);
            await _context.SaveChangesAsync();
            return locationModel;
        }

        public async Task<List<Location>> GetAllAsync()
        {
            var locations = await _context
                .Locations
                .Include(d => d.Desks)
                .ToListAsync();
            return locations;
        }

        public async Task<Location?> GetByIdAsync(int id)
        {
            return await _context.Locations.Include(d => d.Desks).
                FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationModel)
        {
            var existingLocation = await _context.Locations.FirstOrDefaultAsync(l => l.Id == id);

            if (existingLocation == null)
                return null;

            existingLocation.Name = locationModel.Name;

            await _context.SaveChangesAsync();

            return existingLocation;
        }

        public async Task<Location> GetByNameAsync(string name)
        {
            return await Task.Run(() =>
            _context.Locations
                    .AsEnumerable()
                    .FirstOrDefault(d => string.Equals(d.Name, name, StringComparison.OrdinalIgnoreCase))
        );
        }
    }
}
