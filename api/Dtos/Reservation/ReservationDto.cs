namespace api.Dtos.Reservation
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<string> DeskNames { get; set; }
        public List<string> LocationNames { get; set; }
    }
}
