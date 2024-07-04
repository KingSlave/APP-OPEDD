using Microsoft.Data.Sqlite;
using APO_PEDD.Modelos;
using APO_PEDD.Formularios;
using System.Net.Mime;

namespace APO_PEDD
{
    public partial class Principal : Form
    {
        public Principal()
        {
            InitializeComponent();
        }

        private void Principal_Load(object sender, EventArgs e)
        {
            //SqlConnection conexion = new SqlConnection(APO_PEDD.Properties.Settings.Default.conexion);
            //conexion.Open();

            //conexion.Close();

            using (var context = new BDContexto())
            {
                context.Database.EnsureCreated();
                var usuario = new Usuario()
                {
                    correo = "carlos.rd@huetamo.tecnm.mx",
                    nombre = "anonimo",
                    llave = "sin definir",
                    año = 2025,
                    valorUMA = 3300.53f
                };
                if (context.Usuario.Find(usuario.correo) == null)
                    context.Usuario.Add(usuario);

                var n = new Niveles()
                {
                    nivel = 1,minimo = 301,maximo = 400,uma = 1,estimado = 39606.36f
                };
                if (context.Niveles.Find(n.nivel) == null)
                    context.Niveles.Add(n);

                n = new Niveles()
                {
                    nivel = 2,minimo = 401,maximo = 500,uma = 2,estimado = 79212.72f
                };
                if (context.Niveles.Find(n.nivel) == null)
                    context.Niveles.Add(n);
                 n = new Niveles()
                {
                    nivel = 3,minimo = 501,maximo = 600,uma = 3,estimado = 118819.08f
                };
                if (context.Niveles.Find(n.nivel) == null)
                    context.Niveles.Add(n);
                 n = new Niveles()
                {
                    nivel = 4,minimo = 601,maximo = 700,uma = 4,estimado = 158425.44f
                };
                if (context.Niveles.Find(n.nivel) == null)
                    context.Niveles.Add(n);
                n = new Niveles()
                {
                    nivel = 5, minimo = 701, maximo = 1000, uma = 5, estimado = 198031.8f
                };
                if (context.Niveles.Find(n.nivel) == null)
                    context.Niveles.Add(n);


                context.SaveChanges();

                dataGridView1.DataSource = context.Autoevaluacion.ToList();
            }

        }

        private void tablaDeNivelesToolStripMenuItem_Click(object sender, EventArgs e)
        {
            new TablaNiveles().Show();
        }
    }
}
