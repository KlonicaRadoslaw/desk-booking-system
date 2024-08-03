using api.Interfaces;
using api.Dtos.Desk;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Mappers;
using api.Repositories;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeskController : ControllerBase
    {
        private readonly IDeskRepository _deskRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IReservationRepository _reservationRepository;

        public DeskController(IDeskRepository deskRepository, ILocationRepository locationRepository, IReservationRepository reservationRepository)
        {
            _deskRepository = deskRepository;
            _locationRepository = locationRepository;
            _reservationRepository = reservationRepository;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllDesks()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var desks = await _deskRepository.GetAllAsync();
            return Ok(desks);
        }

        [HttpGet("/api/Desk/location/{locationId:int}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDesksByLocationId([FromRoute] int locationId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var desks = await _deskRepository.GetByLocationId(locationId);
            return Ok(desks);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetDeskById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var desk = await _deskRepository.GetByIdAsync(id);

            if (desk == null)
                return NotFound();

            return Ok(desk);
        }

        [HttpPost]
        public async Task<IActionResult> AddDesk(CreateDeskRequestDto deskDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var deskModel = deskDto.ToDeskFromCreateDto();

            var existingDesk = await _deskRepository.GetByNameAndLocationAsync(deskModel.Name, deskModel.LocationId);
            if (existingDesk != null)
            {
                return Conflict("A desk with the same name already exists in the specified location.");
            }

            await _deskRepository.CreateAsync(deskModel);
            return CreatedAtAction(nameof(GetDeskById), new { id = deskModel.Id }, deskModel.ToDeskDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateDeskRequestDto updateDto)
        {
            var deskModel = await _deskRepository.UpdateAsync(id, updateDto);

            if (deskModel == null) 
                return NotFound();

            var existingDesk = await _deskRepository.GetByNameAndLocationAsync(deskModel.Name, deskModel.LocationId);
            if (existingDesk != null)
            {
                return Conflict("A desk with the same name already exists in the specified location.");
            }

            return Ok(deskModel.ToDeskDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDesk(int id)
        {
            var desk = await _deskRepository.GetByIdAsync(id);

            if (desk == null)
                return NotFound();

            if (desk.DeskReservations.Count > 0)
                return BadRequest("Cannot delete desk with existing reservations.");

            await _deskRepository.DeleteAsync(id);

            return NoContent();
        }

        [HttpGet("available/{date}")]
        public async Task<IActionResult> GetAvailableDesks([FromRoute] DateTime date)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var formattedDate = date.Date;

            var reservations = await _reservationRepository.GetReservationsByDate(formattedDate);

            var reservedDeskIds = new HashSet<int>(
                reservations.SelectMany(r => r.DeskReservations.Select(dr => dr.DeskId))
            );

            var availableDesks = await _deskRepository.GetAllAsync();

            var filteredDesks = availableDesks.Where(desk => !reservedDeskIds.Contains(desk.Id)).ToList();

            return Ok(filteredDesks);
        }
    }
}
