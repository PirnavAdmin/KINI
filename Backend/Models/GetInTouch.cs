using System.ComponentModel.DataAnnotations;

namespace Registerkini.Models
{
    public class GetInTouch
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string MobileNumber { get; set; }

        public required string Subject { get; set; }

        public required string Message { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}