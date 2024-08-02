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

        public async Task<IEnumerable<ReservationDto>> GetAllAsync()
        {
            return await _context.Reservations
                .Include(r => r.DeskReservations)
                    .ThenInclude(dr => dr.Desk)
                        .ThenInclude(d => d.Location)
                .Include(r => r.AppUser)
                .Select(r => new ReservationDto
                {
                    Id = r.Id,
                    UserId = r.AppUserId,
                    UserName = r.AppUser.UserName,
                    StartDate = r.StartDate,
                    EndDate = r.EndDate,
                    DeskNames = r.DeskReservations.Select(dr => dr.Desk.Name).ToList(),
                    LocationNames = r.DeskReservations.Select(dr => dr.Desk.Location.Name).Distinct().ToList()
                })
                .ToListAsync();
        }

        public async Task<ReservationDto> GetByIdAsync(int reservationId)
        {
            return await _context.Reservations
                .Include(r => r.DeskReservations)
                    .ThenInclude(dr => dr.Desk)
                        .ThenInclude(d => d.Location)
                .Include(r => r.AppUser)
                .Where(r => r.Id == reservationId)
                .Select(r => new ReservationDto
                {
                    Id = r.Id,
                    UserId = r.AppUserId,
                    UserName = r.AppUser.UserName,
                    StartDate = r.StartDate,
                    EndDate = r.EndDate,
                    DeskNames = r.DeskReservations.Select(dr => dr.Desk.Name).ToList(),
                    LocationNames = r.DeskReservations.Select(dr => dr.Desk.Location.Name).Distinct().ToList()
                })
                .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ReservationDto>> GetByUserIdAsync(string userId)
        {
            return await _context.Reservations
                .Include(r => r.DeskReservations)
                    .ThenInclude(dr => dr.Desk)
                        .ThenInclude(d => d.Location)
                .Include(r => r.AppUser)
                .Where(r => r.AppUserId == userId)
                .Select(r => new ReservationDto
                {
                    Id = r.Id,
                    UserId = r.AppUserId,
                    UserName = r.AppUser.UserName,
                    StartDate = r.StartDate,
                    EndDate = r.EndDate,
                    DeskNames = r.DeskReservations.Select(dr => dr.Desk.Name).ToList(),
                    LocationNames = r.DeskReservations.Select(dr => dr.Desk.Location.Name).Distinct().ToList()
                })
                .ToListAsync();
        }

        public async Task CreateAsync(CreateReservationRequestDto reservationDto)
        {
            var reservation = new Reservation
            {
                AppUserId = reservationDto.UserId,
                StartDate = reservationDto.StartDate,
                EndDate = reservationDto.EndDate,
                DeskReservations = reservationDto.DeskIds.Select(deskId => new DeskReservation { DeskId = deskId }).ToList()
            };

            _context.Reservations.Add(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(int reservationId, UpdateReservationRequestDto updateDto)
        {
            var reservation = await _context.Reservations
                .Include(r => r.DeskReservations)
                .FirstOrDefaultAsync(r => r.Id == reservationId);

            if (reservation == null) return false;

            reservation.StartDate = updateDto.StartDate;
            reservation.EndDate = updateDto.EndDate;

            _context.DeskReservations.RemoveRange(reservation.DeskReservations);

            reservation.DeskReservations = updateDto.DeskIds.Select(deskId => new DeskReservation { DeskId = deskId, ReservationId = reservationId }).ToList();

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int reservationId)
        {
            var reservation = await _context.Reservations
                .Include(r => r.DeskReservations)
                .FirstOrDefaultAsync(r => r.Id == reservationId);

            if (reservation == null) return false;

            _context.DeskReservations.RemoveRange(reservation.DeskReservations);

            _context.Reservations.Remove(reservation);

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsDeskAvailableAsync(int deskId, DateTime startDate, DateTime endDate)
        {
            return !await _context.Reservations
                .Where(r => r.DeskReservations.Any(dr => dr.DeskId == deskId) &&
                            r.StartDate < endDate &&
                            r.EndDate > startDate)
                .AnyAsync();
        }

        public async Task<bool> IsDeskReservedAsync(int deskId, DateTime startDate, DateTime endDate)
        {
            return await _context.DeskReservations
                .Where(dr => dr.DeskId == deskId)
                .Select(dr => dr.Reservation)
                .AnyAsync(r =>
                    r.StartDate < endDate &&
                    r.EndDate > startDate);
        }
    }
}
