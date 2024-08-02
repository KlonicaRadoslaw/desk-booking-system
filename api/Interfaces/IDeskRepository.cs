using api.Dtos.Desk;
using api.Models;

namespace api.Interfaces
{
    public interface IDeskRepository
    {
        Task<List<Desk>> GetAllAsync();
        Task<Desk?> GetByIdAsync(int id);
        Task<Desk> CreateAsync(Desk deskModel);
        Task<Desk?> UpdateAsync(int id, UpdateDeskRequestDto deskModel);
        Task<Desk?> DeleteAsync(int id);
        Task<List<Desk>> GetByLocationId(int locationId);
        Task<Desk> GetByNameAndLocationAsync(string name, int locationId);
    }
}
