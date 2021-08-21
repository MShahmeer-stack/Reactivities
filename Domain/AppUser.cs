using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;


namespace Domain
{
    public class AppUser : IdentityUser
    {
        public string DisplayName { get; set; }

        public string Bio { get; set; }

        public string  AccountNumber { get; set; }
        
        public ICollection<UserActivity> Activities { get; set; }

        public ICollection<Photo> Photos {get; set;}
    }
}