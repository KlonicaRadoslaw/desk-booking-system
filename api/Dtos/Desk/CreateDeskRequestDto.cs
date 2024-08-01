namespace api.Dtos.Desk
{
    public class CreateDeskRequestDto
    {
        public int LocationId { get; set; }
        public string Name { get; set; }
        public bool isAvailable { get; set; }
    }
}
