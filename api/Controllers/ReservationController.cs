using api.Dtos.Reservation;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
{
    private readonly IReservationRepository _reservationRepository;
    private readonly UserManager<ApplicationUser> _userManager;

    public ReservationController(IReservationRepository reservationRepository, UserManager<ApplicationUser> userManager)
    {
        _reservationRepository = reservationRepository;
        _userManager = userManager;
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
        await _reservationRepository.CreateAsync(createReservationDto);

        // Fetch the created reservation to return its details
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
}
}
