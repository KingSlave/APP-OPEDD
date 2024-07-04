using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace APO_PEDD.Modelos
{
    public class BDContexto : DbContext
    {
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<RCategoria> RCategoria { get; set; }
        public DbSet<RSeccion> RSeccion { get; set; }
        public DbSet<RActividad> RActividad { get; set; }
        public DbSet<Autoevaluacion> Autoevaluacion { get; set; }
        public DbSet<Niveles> Niveles { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(Properties.Settings.Default.sqliteConexion, builder =>
            {
                // builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
            }
            );
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Autoevaluacion>()
                  .HasKey(m => new { m.año, m.nactividad, m.nevidencia });
            modelBuilder
                .Entity<Autoevaluacion>()
                .Property(d => d.estado)
                .HasConversion<string>();
            modelBuilder
                .Entity<Autoevaluacion>()
                .Property(d => d.confianza)
                .HasConversion<string>();
        }

    }
}
