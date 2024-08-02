using api.Models;
using api.Dtos.Location;

namespace api.Interfaces
{
    public interface ILocationRepository
    {
        Task<List<Location>> GetAllAsync();
        Task<Location?> GetByIdAsync(int id);
        Task<Location> CreateAsync(Location locationModel);
        Task<Location?> UpdateAsync(int id, UpdateLocationRequestDto locationModel);
        Task<Location?> DeleteAsync(int id);
        Task<Location> GetByNameAsync(string name);

    }
}
