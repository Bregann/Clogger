namespace Clogger.Domain.Interfaces.Api
{
    public interface IUserDataService
    {
        Task<bool> SetUsername(string name, string userId);
    }
}
