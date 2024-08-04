﻿using api.Dtos.Location;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> GetLocations()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var locations = await _locationRepository.GetAllAsync();

            return Ok(locations);
        }

        [HttpGet("{id:int}")]
        [Authorize(Roles = "Admin, User")]
        public async Task<IActionResult> GetLocationById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var location = await _locationRepository.GetByIdAsync(id);

            if (location == null)
                return NotFound();

            return Ok(location);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create([FromBody] CreateLocationRequestDto locationDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var locationModel = locationDto.ToLocationFromCreateDto();

            var existingLocation = await _locationRepository.GetByNameAsync(locationModel.Name);
            if (existingLocation != null)
            {
                return Conflict("A location with the same name already exists.");
            }

            await _locationRepository.CreateAsync(locationModel);
            return CreatedAtAction(nameof(GetLocationById), new { id = locationModel.Id }, locationModel.ToLocationDto());
        }

        [HttpPut]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateLocationRequestDto updateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var locationModel = await _locationRepository.UpdateAsync(id, updateDto);

            if (locationModel == null) return NotFound();

            return Ok(locationModel.ToLocationDto());
        }

        [HttpDelete]
        [Route("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var locationModel = await _locationRepository.GetByIdAsync(id);

            if (locationModel.Desks.Any())
                return Conflict("Location has desks!");

            if (locationModel == null)
                return NotFound();

            await _locationRepository.DeleteAsync(id);

            return NoContent();
        }
    }
}
