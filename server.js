const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const config = require("config");

const app = express();

//body parser in express
app.use(express.json());
//cookies parser
app.use(cookieParser());
//connecting to DB
connectDB();

app.use("/uploads", express.static("uploads"));

//define routes
app.use("/api/", require("./routes/api/token"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/company", require("./routes/api/company"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/offer", require("./routes/api/offer"));

//starting server
const PORT = config.get("PORT") || 5000;
app.listen(PORT, (err) => (err ? console.log(err) : console.log("Server listening on PORT", PORT)));
