namespace api.Dtos.Desk
{
    public class GetDeskDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool isAvailable { get; set; }
        public string LocationName { get; set; }
    }
}
