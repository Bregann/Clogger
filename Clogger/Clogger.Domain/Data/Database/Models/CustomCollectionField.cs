using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clogger.Domain.Data.Database.Models
{
    public class CustomCollectionField
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Collection))]
        public int CollectionId { get; set; }

        public Collection Collection { get; set; } = null!;

        [Required]
        public string FieldName { get; set; } = null!;

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
