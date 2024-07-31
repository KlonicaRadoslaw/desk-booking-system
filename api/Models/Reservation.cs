namespace api.Models
{
    public class Reservation
    {
        public string AppUserId { get; set; }
        public int DeskId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Desk Desk { get; set; }
    }
}
