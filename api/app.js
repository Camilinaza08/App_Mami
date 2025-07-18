import express from "express"
import cors from "cors"
import sequelize from "./db.js"
import logger from "./middlewares/logger.js"
import empleadoRouter from "./routes/empleados.routes.js"
import horarioRouter from "./routes/horarios.routes.js"
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app
  .use(express.json())
  .use(express.urlencoded({extended: true}))

app.use(logger)

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

//Routers
app
    .use("/api/empleados", empleadoRouter)
    .use("/api/horarios", horarioRouter)
//Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


//Inicio de servidor
(async function start() {
    // Validar conexión a la base de datos.
   try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:\n", error);
    process.exit(1);
  }

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();
