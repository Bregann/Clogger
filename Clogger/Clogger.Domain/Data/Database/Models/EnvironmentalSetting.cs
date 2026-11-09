using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clogger.Domain.Data.Database.Models
{
    public class EnvironmentalSetting
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        /// <summary>The setting's name as text, e.g. "ProjectMonitorApiKey" (same as the other projects).</summary>
        [Required]
        public required string Key { get; set; }
        public required string Value { get; set; } = string.Empty;
    }
}
