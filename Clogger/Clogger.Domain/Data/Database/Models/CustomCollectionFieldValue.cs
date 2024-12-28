using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clogger.Domain.Data.Database.Models
{
    public class CustomCollectionFieldValue
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(CollectionItem))]
        public int CollectionItemId { get; set; }

        public CollectionItem CollectionItem { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(CustomCollectionField))]
        public int CustomCollectionFieldId { get; set; }

        [DeleteBehavior(DeleteBehavior.Cascade)]
        public CustomCollectionField CustomCollectionField { get; set; } = null!;

        [Required]
        public string FieldValue { get; set; } = null!;
    }
}
