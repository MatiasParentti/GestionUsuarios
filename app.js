const express = require("express");
const path = require("path");
const morgan = require("morgan");
const userRoutes = require("./routes/user.routes");
const roleRoutes = require("./routes/role.routes");
const permisoRoutes = require("./routes/permiso.routes");
const rolPermisoRoutes = require("./routes/rol_permiso.routes");

const authRoutes = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const sessionMiddleware = require("./middleware/session.middleware");

const createError = require("http-errors");

// Instancia de la app
const app = express();

// Configuracion de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuracion de entorno
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Configuracion de rutas
app.use("/users", sessionMiddleware, userRoutes);
app.use("/roles", sessionMiddleware, roleRoutes);
app.use("/permisos", sessionMiddleware, permisoRoutes);
app.use("/rolpermiso", rolPermisoRoutes);
app.use("/auth", authRoutes);

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/dashboard", sessionMiddleware, (req, res) => {
  res.render("dashboard");
});

// Configuracion de redireccion (por defecto)
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Middleware de error 404
app.use((req, res, next) => {
  next(createError(404, "Ruta no encontrada"));
});

// Manejador de errores
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("general_error", {
    message: err.message,
    error: app.get("env") === "development" ? err : {},
  });
});

module.exports = app;
