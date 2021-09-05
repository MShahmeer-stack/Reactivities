
using System.ComponentModel.DataAnnotations;

namespace API.DTO
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        
        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$", ErrorMessage="Password must be complex")]
         [StringLength(50, MinimumLength = 4 , ErrorMessage="Password should lie b/w 4 to 8 characters")]
        public string Password { get; set; }
        
        [Required]
         public string  AccountNumber { get; set; }
         
    }
}