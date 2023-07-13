const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://test:test123@cluster0.ixluwie.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(
    (result) => app.listen(3005),
    (req, res) => {
      console.log("Serve is running on port 3005");
    }
  )
  .catch((err) => console.log(err));

// routes
app.get("/", (req, res) => res.render("home"));



app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);
