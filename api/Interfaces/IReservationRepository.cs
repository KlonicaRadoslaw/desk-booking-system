using api.Dtos.Reservation;
using api.Models;

namespace api.Interfaces
{
    public interface IReservationRepository
    {
        Task<List<Reservation>> GetAllAsync();
        Task<Reservation?> GetByIdAsync(int id);
        Task<Reservation> CreateAsync(Reservation reservationModel);
        Task<Reservation?> UpdateAsync(int id, UpdateReservationRequestDto reservationModel);
        Task<Reservation?> DeleteAsync(int id);
    }
}
