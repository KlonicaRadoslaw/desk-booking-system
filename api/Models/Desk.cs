namespace api.Models
{
    public class Desk
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public string Name { get; set; }
        public bool IsAvailable { get; set; }
        public Location Location { get; set; }
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
