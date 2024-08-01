using api.Dtos.Location;
using api.Models;

namespace api.Mappers
{
    public static class LocationMappers
    {
        public static LocationDto ToLocationDto(this Location locationModel) 
        {
            return new LocationDto
            {
                Name = locationModel.Name
            };
        }

        public static Location ToLocationFromCreateDto(this CreateLocationRequestDto requestDto)
        {
            return new Location
            {
                Name = requestDto.Name
            };
        }
    }
}
