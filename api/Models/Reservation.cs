namespace api.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public string AppUserId { get; set; }
        public ApplicationUser AppUser { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<DeskReservation> DeskReservations { get; set; } = new List<DeskReservation>();
    }
}
