namespace Clogger.Domain.DTOs.Home.Responses
{
    public class GetUserHeaderStatsDto
    {
        public required string UserFirstName { get; set; }
        public required int TotalCollections { get; set; }
        public required int TotalItems { get; set; }
    }
}
