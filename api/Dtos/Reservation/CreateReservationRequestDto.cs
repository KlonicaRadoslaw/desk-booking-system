namespace api.Dtos.Reservation
{
    public class CreateReservationRequestDto
    {
        public string UserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<int> DeskIds { get; set; }
    }
}
