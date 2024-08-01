
using api.Dtos.Reservation;
using api.Models;

namespace api.Mappers
{
    public static class ReservationMappers
    {
        public static ReservationDto ToReservationDto(this Reservation reservation)
        {
            return new ReservationDto
            {
                Id = reservation.Id,
                UserId = reservation.AppUserId,
                UserName = reservation.AppUser.UserName,
                StartDate = reservation.StartDate,
                EndDate = reservation.EndDate,
                DeskNames = reservation.DeskReservations.Select(dr => dr.Desk.Name).ToList(),
                LocationNames = reservation.DeskReservations.Select(dr => dr.Desk.Location.Name).Distinct().ToList()
            };
        }

        public static Reservation ToReservationFromCreateDto(this CreateReservationRequestDto reservationDto)
        {
            return new Reservation
            {
                AppUserId = reservationDto.UserId,
                StartDate = reservationDto.StartDate,
                EndDate = reservationDto.EndDate,
                DeskReservations = reservationDto.DeskIds.Select(deskId => new DeskReservation { DeskId = deskId }).ToList()
            };
        }

        public static void ToReservationFromUpdateDto(this UpdateReservationRequestDto reservationDto, Reservation reservation)
        {
            reservation.StartDate = reservationDto.StartDate;
            reservation.EndDate = reservationDto.EndDate;
            reservation.DeskReservations.Clear();
            reservation.DeskReservations.AddRange(reservationDto.DeskIds.Select(deskId => new DeskReservation { DeskId = deskId }));
        }
    }
}
