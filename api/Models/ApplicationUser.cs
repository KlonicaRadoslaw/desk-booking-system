using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class ApplicationUser : IdentityUser
    {
        public List<Reservation> Reservations { get; set; } = new List<Reservation>();
    }
}
