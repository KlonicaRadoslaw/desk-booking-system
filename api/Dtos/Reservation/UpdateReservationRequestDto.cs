﻿namespace api.Dtos.Reservation
{
    public class UpdateReservationRequestDto
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<int> DeskIds { get; set; }
    }
}