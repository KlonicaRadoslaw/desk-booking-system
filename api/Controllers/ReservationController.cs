using api.Dtos.Reservation;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly IReservationRepository _reservationRepository;

        public ReservationController(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReservations()
        {
            var reservations = await _reservationRepository.GetAllAsync();
            return Ok(reservations);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetReservationById(int id)
        {
            var reservation = await _reservationRepository.GetByIdAsync(id);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservationsByUserId(string userId)
        {
            var reservations = await _reservationRepository.GetByUserIdAsync(userId);
            return Ok(reservations);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReservation([FromBody] CreateReservationRequestDto createReservationDto)
        {
            foreach (var deskId in createReservationDto.DeskIds)
            {
                var isOverlapping = await _reservationRepository.IsDeskReservedAsync(deskId, createReservationDto.StartDate, createReservationDto.EndDate);
                if (isOverlapping)
                {
                    return Conflict($"Desk {deskId} is already reserved during the chosen dates.");
                }
            }

            await _reservationRepository.CreateAsync(createReservationDto);

            var createdReservation = await _reservationRepository.GetByUserIdAsync(createReservationDto.UserId);
            var reservation = createdReservation.FirstOrDefault(r => r.StartDate == createReservationDto.StartDate && r.EndDate == createReservationDto.EndDate);

            if (reservation == null)
                return BadRequest("Failed to create reservation");

            return CreatedAtAction(nameof(GetReservationById), new { id = reservation.Id }, reservation);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateReservation(int id, UpdateReservationRequestDto updateReservationDto)
        {
            var reservation = await _reservationRepository.GetByIdAsync(id);
            if (reservation == null)
                return NotFound();

            var result = await _reservationRepository.UpdateAsync(id, updateReservationDto);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteReservation(int id)
        {
            var reservation = await _reservationRepository.GetByIdAsync(id);
            if (reservation == null)
                return NotFound();

            var result = await _reservationRepository.DeleteAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpGet("availability")]
        public async Task<IActionResult> CheckDeskAvailability([FromQuery] int deskId, [FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var isAvailable = await _reservationRepository.IsDeskAvailableAsync(deskId, startDate, endDate);
            return Ok(isAvailable);
        }
    }
}
