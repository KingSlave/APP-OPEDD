using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APO_PEDD.Modelos
{
    public class Niveles
    {
        [Key]
        public int nivel {  get; set; }
        public int minimo { get; set; }
        public int maximo { get; set; }
        public float uma {  get; set; }
        public float estimado {  get; set; }
        //calculo estimado de beneficio a partir del valor UMA
    }
}
