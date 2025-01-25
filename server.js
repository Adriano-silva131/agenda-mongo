const express = require("express");
const connectDB = require("./db");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const rotas = require("./routes/index");
const userRoutes = require("./routes/userRoutes");
const contatoRoutes = require("./routes/contatoRoutes");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 3600000, // 1 hora
    },
  })
);

app.use(cookieParser());
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", rotas);
app.use(userRoutes);
app.use(contatoRoutes);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
