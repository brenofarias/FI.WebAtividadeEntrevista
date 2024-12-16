using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebAtividadeEntrevista.Models
{
    public class BeneficiarioModel
    {
        public long Id { get; set; }
        public string Nome { get; set; }

        [RegularExpression(@"^\d{3}.?\d{3}.?\d{3}-?\d{2}$", ErrorMessage = "Digite um CPF válido")]
        [Required(ErrorMessage = "Digite um CPF válido")]
        [MaxLength(14)]
        public string CPF { get; set; }
        public long IdCliente { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}