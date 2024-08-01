using api.Dtos.Desk;
using api.Models;

namespace api.Mappers
{
    public static class DeskMappers
    {
        public static DeskDto ToDeskDto(this Desk deskModel)
        {
            return new DeskDto
            {
                LocationId = deskModel.LocationId,
                Name = deskModel.Name,
                isAvailable = deskModel.isAvailable
            };
        }

        public static GetDeskDto ToGetDeskDto(this Desk deskModel)
        {
            return new GetDeskDto
            {
                Id = deskModel.Id,
                Name = deskModel.Name,
                isAvailable = deskModel.isAvailable,
                LocationName = deskModel.Location.Name
            };
        }

        public static Desk ToDeskFromCreateDto(this CreateDeskRequestDto requestDto)
        {
            return new Desk
            {
                LocationId = requestDto.LocationId,
                Name = requestDto.Name,
                isAvailable = requestDto.isAvailable
            };
        }
    }
}
