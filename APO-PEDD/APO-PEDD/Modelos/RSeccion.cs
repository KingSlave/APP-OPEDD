using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APO_PEDD.Modelos
{
    public class RSeccion
    {
        [Key]
        public string nseccion { get; set; }
        //public string ncategoria { get; set; }
        public string nombre { get; set; }
        public int pmax { get; set; }
        public RCategoria categoria { get; set; }

    }
}
