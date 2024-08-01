namespace api.Dtos.Desk
{
    public class UpdateDeskRequestDto
    {
        public int LocationId { get; set; }
        public string Name { get; set; }
        public bool isAvailable { get; set; }
    }
}
