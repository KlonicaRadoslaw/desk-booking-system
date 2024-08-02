using api.Data;
using api.Dtos.Desk;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class DeskRepository : IDeskRepository
    {
        private readonly ApplicationDbContext _context;
        public DeskRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Desk> CreateAsync(Desk deskModel)
        {
            await _context.Desks.AddAsync(deskModel);
            await _context.SaveChangesAsync();
            return deskModel;
        }

        public async Task<Desk?> DeleteAsync(int id)
        {
            var deskModel = _context.Desks.FirstOrDefault(x => x.Id == id);
            if (deskModel == null)
                return null;

            _context.Desks.Remove(deskModel);
            await _context.SaveChangesAsync();
            return deskModel;
        }

        public async Task<List<Desk>> GetAllAsync()
        {
            var desks = await _context.Desks
            .Include(d => d.Location)
            .ToListAsync();

            return desks;
        }

        public async Task<List<Desk>> GetByLocationId(int locationId)
        {
            var desks = await _context.Desks
            .Where(d => d.LocationId == locationId)
            .Include(d => d.Location)
            .ToListAsync();
            return desks;
        }

        public async Task<Desk?> GetByIdAsync(int id)
        {
            return await _context
                .Desks
                .Include(d => d.Location)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task<Desk?> UpdateAsync(int id, UpdateDeskRequestDto deskModel)
        {
            var existingDesk = await _context.Desks.FirstOrDefaultAsync(l => l.Id == id);

            if (existingDesk == null)
                return null;

            existingDesk.Name = deskModel.Name;
            existingDesk.LocationId = deskModel.LocationId;
            existingDesk.isAvailable = deskModel.isAvailable;


            await _context.SaveChangesAsync();

            return existingDesk;
        }

        public async Task<Desk> GetByNameAndLocationAsync(string name, int locationId)
        {
            return await _context.Desks
                .Where(d => d.Name.Equals(name, StringComparison.OrdinalIgnoreCase) && d.LocationId == locationId)
                .FirstOrDefaultAsync();
        }
    }
}
