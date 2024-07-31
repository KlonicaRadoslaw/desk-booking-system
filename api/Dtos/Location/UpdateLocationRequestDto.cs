using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Location
{
    public class UpdateLocationRequestDto
    {
        [Required]
        [MaxLength(30, ErrorMessage = "Location name cannot be over 30 characters")]
        public string Name { get; set; }
    }
}
