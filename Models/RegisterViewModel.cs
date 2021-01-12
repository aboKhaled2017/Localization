using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Localization.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "username")]
        public string Username { get; set; }
        [Required(ErrorMessage = "password")]
        public string Password { get; set; }
    }
}
