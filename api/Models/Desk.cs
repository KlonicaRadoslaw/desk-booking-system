namespace api.Models
{
    public class Desk
    {
        public int Id { get; set; }
        public int LocationId { get; set; }
        public string Name { get; set; }
        public bool isAvailable { get; set; }
        public Location Location { get; set; }
        public List<DeskReservation> DeskReservations { get; set; } = new List<DeskReservation>();
    }
}
