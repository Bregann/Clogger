using Clogger.Domain.Interfaces.Helpers;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Clogger.Domain.Helpers
{
    sealed class EmailSender : IEmailSender
    {
        private readonly ILogger _logger;

        public EmailSender(ILogger<EmailSender> logger)
        {
            _logger = logger;
        }
        public List<Email> Emails { get; set; } = new();

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            _logger.LogWarning($"{email} {subject} {htmlMessage}");
            Emails.Add(new(email, subject, htmlMessage));
            return Task.CompletedTask;
        }
    }
    sealed record Email(string Address, string Subject, string HtmlMessage);
}
