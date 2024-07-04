using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace APO_PEDD.Modelos
{
    public class Usuario
    {
        [Key]
        public string correo { get; set; }
        public string nombre { get; set; } = string.Empty;
        public string llave { get; set; } = string.Empty;
        public int año { get; set; }
        public float valorUMA {  get; set; }
        public Usuario() { }
    }
}
