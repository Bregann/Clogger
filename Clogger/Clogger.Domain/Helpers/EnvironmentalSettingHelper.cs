using Clogger.Domain.Data.Database.Context;
using Clogger.Domain.Enums;
using Clogger.Domain.Interfaces.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Clogger.Domain.Helpers
{
    public class EnvironmentalSettingHelper(IServiceProvider serviceProvider) : IEnvironmentalSettingHelper
    {
        private Dictionary<EnvironmentalSettingEnum, string> _environmentalSettings = [];

        public async Task LoadEnvironmentalSettings()
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var settings = await dbContext.EnvironmentalSettings.ToListAsync();

                // Rows whose key isn't a known setting are ignored rather than stopping startup
                _environmentalSettings = settings
                    .Where(x => Enum.TryParse<EnvironmentalSettingEnum>(x.Key, out _))
                    .ToDictionary(x => Enum.Parse<EnvironmentalSettingEnum>(x.Key), x => x.Value);
            }
        }

        public string? TryGetEnviromentalSettingValue(EnvironmentalSettingEnum key)
        {
            return _environmentalSettings.TryGetValue(key, out var value) ? value : null;
        }

        public async Task<bool> UpdateEnviromentalSettingValue(EnvironmentalSettingEnum key, string newValue)
        {
            if (!_environmentalSettings.ContainsKey(key))
            {
                return false;
            }

            using (var scope = serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                dbContext.EnvironmentalSettings.Where(x => x.Key == key.ToString()).First().Value = newValue;
                await dbContext.SaveChangesAsync();
            }

            _environmentalSettings[key] = newValue;
            return true;
        }
    }
}
