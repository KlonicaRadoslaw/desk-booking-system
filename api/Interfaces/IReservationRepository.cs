using api.Dtos.Reservation;
using api.Models;

namespace api.Interfaces
{
    public interface IReservationRepository
    {
        Task<IEnumerable<ReservationDto>> GetAllAsync();
        Task<ReservationDto> GetByIdAsync(int reservationId);
        Task<IEnumerable<ReservationDto>> GetByUserIdAsync(string userId);
        Task CreateAsync(CreateReservationRequestDto reservationDto);
        Task<bool> UpdateAsync(int reservationId, UpdateReservationRequestDto updateDto);
        Task<bool> DeleteAsync(int reservationId);
        Task<bool> IsDeskAvailableAsync(int deskId, DateTime startDate, DateTime endDate);
        Task<bool> IsDeskReservedAsync(int deskId, DateTime startDate, DateTime endDate);
        Task<List<Reservation>> GetReservationsByDate(DateTime date);
    }
}
