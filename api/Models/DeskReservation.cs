namespace api.Models
{
    public class DeskReservation
    {
        public int DeskId { get; set; }
        public Desk Desk { get; set; }

        public int ReservationId { get; set; }
        public Reservation Reservation { get; set; }
    }
}
