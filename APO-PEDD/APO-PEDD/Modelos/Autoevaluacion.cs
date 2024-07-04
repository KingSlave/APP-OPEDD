using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace APO_PEDD.Modelos
{
    public class Autoevaluacion
    {

        public int año { get; set; }
        public string nactividad { get; set; }
        public string nevidencia { get; set; }
        public float puntos { get; set; }
        public CONFIANZA confianza { get; set; } // 0 a 100 % (alta,media,baja)
        public string nota { get; set; }
        public ESTADO estado { get; set; } //Completo //Incompleto

        public RActividad actividad { get; set; }

        public enum ESTADO { COMPLETO, INCOMPLETO}
        public enum CONFIANZA { ALTA,MEDIA,BAJA}

    }
}
