using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clogger.Domain.Data.Database.Models
{
    public class Collection
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public string CollectionName { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(CollectionItem))]
        public int CollectionItemId { get; set; }

        public virtual ICollection<CollectionItem> CollectionItems { get; set; } = [];

        [Required]
        public string Description { get; set; } = null!;

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;

        public virtual User User { get; set; } = null!;

        public virtual ICollection<CustomCollectionField> CustomCollectionFields { get; set; } = [];
    }
}
