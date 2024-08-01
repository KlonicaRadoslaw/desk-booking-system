using api.Data;
using api.Dtos.Reservation;
using api.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api.Tests.Reservation
{
    public class ReservationServiceTests
    {
        private readonly ApplicationDbContext _context;
        private readonly ReservationRepository _service;

        public ReservationServiceTests()
        {
            _context = TestContextFactory.GetTestDatabaseContext().Result;
            _service = new ReservationRepository(_context); // Assuming ReservationService uses ApplicationDbContext
        }

        [Fact]
        public async Task CreateAsync_ShouldAddReservationToDatabase()
        {
            // Arrange
            var requestDto = new CreateReservationRequestDto
            {
                UserId = "02837bed-d7eb-4471-a986-396e5878efb9",
                StartDate = DateTime.UtcNow,
                EndDate = DateTime.UtcNow.AddDays(1),
                DeskIds = new List<int> { 1 } // Adjust this ID according to your test setup
            };

            // Act
            await _service.CreateAsync(requestDto);

            // Assert
            var reservation = await _context.Reservations
                .Include(r => r.DeskReservations)
                .FirstOrDefaultAsync(r => r.AppUserId == requestDto.UserId && r.StartDate == requestDto.StartDate);

            Assert.NotNull(reservation);
            Assert.Equal(requestDto.UserId, reservation.AppUserId);
            Assert.Equal(requestDto.StartDate, reservation.StartDate);
            Assert.Equal(requestDto.EndDate, reservation.EndDate);
            Assert.Single(reservation.DeskReservations);
            Assert.Equal(requestDto.DeskIds.First(), reservation.DeskReservations.First().DeskId);
        }

        [Fact]
        public async Task GetReservationById_ShouldReturnNull()
        {
            // Arrange
            var reservationId = 999; // Assuming this ID exists

            // Act
            var reservation = await _service.GetByIdAsync(reservationId);

            // Assert
            Assert.Null(reservation);
        }

        [Fact]
        public async Task UpdateReservation_ShouldUpdateReservationDetails()
        {
            // Arrange
            var reservationId = 1; // Assuming this ID exists
            var updateDto = new UpdateReservationRequestDto
            {
                StartDate = DateTime.UtcNow.AddDays(2),
                EndDate = DateTime.UtcNow.AddDays(3),
                DeskIds = new List<int> { 7 }
            };

            // Act
            var success = await _service.UpdateAsync(reservationId, updateDto);
            var reservation = await _context.Reservations.FindAsync(reservationId);

            // Assert
            Assert.True(success);
            Assert.NotNull(reservation);
            Assert.Equal(updateDto.StartDate, reservation.StartDate);
            Assert.Equal(updateDto.EndDate, reservation.EndDate);
        }

        [Fact]
        public async Task DeleteReservation_ShouldRemoveReservation()
        {
            // Arrange
            var reservationId = 1; // Assuming this ID exists

            // Act
            var success = await _service.DeleteAsync(reservationId);
            var reservation = await _context.Reservations.FindAsync(reservationId);

            // Assert
            Assert.True(success);
            Assert.Null(reservation);
        }
    }
}
