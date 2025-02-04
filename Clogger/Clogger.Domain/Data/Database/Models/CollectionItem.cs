using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clogger.Domain.Data.Database.Models
{
    public class CollectionItem
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [ForeignKey(nameof(Collection))]
        public int CollectionId { get; set; }

        [DeleteBehavior(DeleteBehavior.Cascade)]
        public virtual Collection Collection { get; set; } = null!;

        [Required]
        public string ItemName { get; set; } = null!;

        [Required]
        public string ItemDescription { get; set; } = null!;

        public string? PictureUrl { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }

        [Required]
        public DateTime UpdatedAt { get; set; }

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;

        public virtual User User { get; set; } = null!;

        public virtual ICollection<CustomCollectionFieldValue> CustomCollectionFieldValues { get; set; } = [];
    }
}
