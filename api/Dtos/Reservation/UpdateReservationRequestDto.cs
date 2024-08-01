namespace api.Dtos.Reservation
{
    public class UpdateReservationRequestDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
