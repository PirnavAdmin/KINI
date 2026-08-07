using System.ComponentModel.DataAnnotations;

namespace Registerkini.DTOs
{
    public class RegistrationDto
    {
        [Required]
        public required string Name { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        [Required]
        public required string MobileNumber { get; set; }

        [Required]
        public required string Qualification { get; set; }

        [Required]
        public required string Program { get; set; }
    }
}