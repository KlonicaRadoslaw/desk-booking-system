using api.Data;
using api.Dtos.Reservation;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class ReservationRepository : IReservationRepository
    {
        private readonly ApplicationDbContext _context;
        public ReservationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Reservation> CreateAsync(Reservation reservationModel)
        {
            await _context.Reservations.AddAsync(reservationModel);
            await _context.SaveChangesAsync();
            return reservationModel;
        }

        public async Task<Reservation?> DeleteAsync(int id)
        {
            var reservationModel = _context.Reservations.FirstOrDefault(x => x.DeskId == id);
            if (reservationModel == null)
                return null;

            _context.Reservations.Remove(reservationModel);
            await _context.SaveChangesAsync();
            return reservationModel;
        }

        public async Task<List<Reservation>> GetAllAsync()
        {
            var reservations = await _context
                .Reservations
                .ToListAsync();
            return reservations;
        }

        public async Task<Reservation?> GetByIdAsync(int id)
        {
            return await _context.Reservations.FirstOrDefaultAsync(l => l.DeskId == id);
        }

        public async Task<Reservation?> UpdateAsync(int id, UpdateReservationRequestDto reservationModel)
        {
            var existingReservation = await _context.Reservations.FirstOrDefaultAsync(r => r.DeskId == id);

            if (existingReservation == null)
                return null;

            existingReservation.DeskId = reservationModel.DeskId;
            existingReservation.StartDate = reservationModel.StartDate;
            existingReservation.EndDate = reservationModel.EndDate;


            await _context.SaveChangesAsync();

            return existingReservation;
        }
    }
}
