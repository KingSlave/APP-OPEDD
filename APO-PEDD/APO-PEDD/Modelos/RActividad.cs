using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APO_PEDD.Modelos
{
    public class RActividad
    {
        [Key]
        public string nactividad { get; set; }
        //public string nseccion { get; set; }
        public string ngrupo { get; set; }
        public string nombreGrupo { get; set; }
        public string actividad { get; set; }
        public float pmax { get; set; }
        public string descripcion { get; set; }
        public string documentos { get; set; }
        public int numDocs { get; set; }
        public RSeccion seccion { get; set; }
    }
}
