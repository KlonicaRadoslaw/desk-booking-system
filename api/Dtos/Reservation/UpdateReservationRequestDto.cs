namespace api.Dtos.Reservation
{
    public class UpdateReservationRequestDto
    {
        public int DeskId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
