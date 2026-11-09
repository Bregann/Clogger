using Clogger.Domain.Interfaces.Helpers;

namespace Clogger.Api
{
    /// <summary>
    /// Clogger has no Hangfire, so this sends Project Monitor a heartbeat every minute on a timer.
    /// (IHostedService's Start/Stop signatures are the framework's; the token isn't used.)
    /// </summary>
    public class ProjectMonitorHeartbeatService(IServiceScopeFactory scopeFactory) : IHostedService, IDisposable
    {
        private Timer? _timer;

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _timer = new Timer(_ => _ = SendHeartbeat(), null, TimeSpan.FromSeconds(15), TimeSpan.FromMinutes(1));
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, Timeout.Infinite);
            return Task.CompletedTask;
        }

        private async Task SendHeartbeat()
        {
            using IServiceScope scope = scopeFactory.CreateScope();
            await scope.ServiceProvider.GetRequiredService<IProjectMonitorClient>().SendHeartbeat();
        }

        public void Dispose()
        {
            _timer?.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
