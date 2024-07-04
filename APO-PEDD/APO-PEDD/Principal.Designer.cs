namespace APO_PEDD
{
    partial class Principal
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            menuStrip1 = new MenuStrip();
            archivoToolStripMenuItem = new ToolStripMenuItem();
            configuraciónToolStripMenuItem = new ToolStripMenuItem();
            tablaDeNivelesToolStripMenuItem = new ToolStripMenuItem();
            rubricaToolStripMenuItem = new ToolStripMenuItem();
            importarToolStripMenuItem = new ToolStripMenuItem();
            nuevaAutoevaluaciónToolStripMenuItem = new ToolStripMenuItem();
            acercaDeToolStripMenuItem = new ToolStripMenuItem();
            groupBox1 = new GroupBox();
            dataGridView1 = new DataGridView();
            menuStrip1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            SuspendLayout();
            // 
            // menuStrip1
            // 
            menuStrip1.Items.AddRange(new ToolStripItem[] { archivoToolStripMenuItem, acercaDeToolStripMenuItem });
            menuStrip1.Location = new Point(0, 0);
            menuStrip1.Name = "menuStrip1";
            menuStrip1.Size = new Size(776, 24);
            menuStrip1.TabIndex = 0;
            menuStrip1.Text = "menuStrip1";
            // 
            // archivoToolStripMenuItem
            // 
            archivoToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { configuraciónToolStripMenuItem, nuevaAutoevaluaciónToolStripMenuItem });
            archivoToolStripMenuItem.Name = "archivoToolStripMenuItem";
            archivoToolStripMenuItem.Size = new Size(60, 20);
            archivoToolStripMenuItem.Text = "Archivo";
            // 
            // configuraciónToolStripMenuItem
            // 
            configuraciónToolStripMenuItem.DropDownItems.AddRange(new ToolStripItem[] { tablaDeNivelesToolStripMenuItem, rubricaToolStripMenuItem, importarToolStripMenuItem });
            configuraciónToolStripMenuItem.Name = "configuraciónToolStripMenuItem";
            configuraciónToolStripMenuItem.Size = new Size(201, 22);
            configuraciónToolStripMenuItem.Text = "Configuración";
            // 
            // tablaDeNivelesToolStripMenuItem
            // 
            tablaDeNivelesToolStripMenuItem.Name = "tablaDeNivelesToolStripMenuItem";
            tablaDeNivelesToolStripMenuItem.Size = new Size(180, 22);
            tablaDeNivelesToolStripMenuItem.Text = "Tabla de niveles...";
            tablaDeNivelesToolStripMenuItem.Click += tablaDeNivelesToolStripMenuItem_Click;
            // 
            // rubricaToolStripMenuItem
            // 
            rubricaToolStripMenuItem.Name = "rubricaToolStripMenuItem";
            rubricaToolStripMenuItem.Size = new Size(180, 22);
            rubricaToolStripMenuItem.Text = "Rúbrica...";
            // 
            // importarToolStripMenuItem
            // 
            importarToolStripMenuItem.Name = "importarToolStripMenuItem";
            importarToolStripMenuItem.Size = new Size(180, 22);
            importarToolStripMenuItem.Text = "Importar...";
            // 
            // nuevaAutoevaluaciónToolStripMenuItem
            // 
            nuevaAutoevaluaciónToolStripMenuItem.Name = "nuevaAutoevaluaciónToolStripMenuItem";
            nuevaAutoevaluaciónToolStripMenuItem.Size = new Size(201, 22);
            nuevaAutoevaluaciónToolStripMenuItem.Text = "Nueva autoevaluación...";
            // 
            // acercaDeToolStripMenuItem
            // 
            acercaDeToolStripMenuItem.Name = "acercaDeToolStripMenuItem";
            acercaDeToolStripMenuItem.Size = new Size(83, 20);
            acercaDeToolStripMenuItem.Text = "Acerca de ...";
            // 
            // groupBox1
            // 
            groupBox1.Location = new Point(12, 36);
            groupBox1.Name = "groupBox1";
            groupBox1.Size = new Size(752, 94);
            groupBox1.TabIndex = 1;
            groupBox1.TabStop = false;
            groupBox1.Text = "Año 2024";
            // 
            // dataGridView1
            // 
            dataGridView1.AllowUserToAddRows = false;
            dataGridView1.AllowUserToDeleteRows = false;
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(12, 151);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.ReadOnly = true;
            dataGridView1.Size = new Size(752, 150);
            dataGridView1.TabIndex = 2;
            // 
            // Principal
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(776, 313);
            Controls.Add(dataGridView1);
            Controls.Add(groupBox1);
            Controls.Add(menuStrip1);
            MainMenuStrip = menuStrip1;
            Name = "Principal";
            Text = "Asistente pre-Organizador PEDD";
            Load += Principal_Load;
            menuStrip1.ResumeLayout(false);
            menuStrip1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private MenuStrip menuStrip1;
        private ToolStripMenuItem archivoToolStripMenuItem;
        private ToolStripMenuItem acercaDeToolStripMenuItem;
        private GroupBox groupBox1;
        private ToolStripMenuItem configuraciónToolStripMenuItem;
        private ToolStripMenuItem tablaDeNivelesToolStripMenuItem;
        private ToolStripMenuItem rubricaToolStripMenuItem;
        private ToolStripMenuItem importarToolStripMenuItem;
        private ToolStripMenuItem nuevaAutoevaluaciónToolStripMenuItem;
        private DataGridView dataGridView1;
    }
}
