//? ==================================== 
//?             Requirements 
//? ====================================
const express = require("express");
const dotenv = require("dotenv");
const moment = require("moment");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const https = require("https");

//? ==================================== 
//?             Configuration 
//? ====================================
// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;
const isHTTPS = process.env.IS_HTTPS === "true";
const isPFX = process.env.IS_PFX === "true";
const passphrase = process.env.PASSPHRASE;

//? ==================================== 
//?             Middleware 
//? ====================================
app.use(session(require("./helpers/sessionOptions")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.ENVIRONMENT !== "dev") {
    app.use(express.static(path.join(__dirname, "public", "dist")));
}

// Logging Middleware
app.use((req, res, next) => {
    console.log(`Used a ${req.method} method on ${req.url} at ${moment()}`);
    next();
});

//? ==================================== 
//?             Database 
//? ====================================
mongoose.connect(`mongodb://${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

//? ==================================== 
//?             Routes 
//? ====================================
const apiPrefix = process.env.ENVIRONMENT === "dev" ? "" : "/api";

app.use(`${apiPrefix}/test`, require("./routes/testRouter"));
app.use(`${apiPrefix}/users`, require("./routes/userRouter"));
app.use(`${apiPrefix}/`, require("./routes/mainRouter"));

// Serve React App for Non-Dev Environments
if (process.env.ENVIRONMENT !== "dev") {
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "public", "dist", "index.html"));
    });
}

//? ==================================== 
//?             Error Handling 
//? ====================================
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "An error has occurred", error: err });
});

//? ==================================== 
//?             Server Start 
//? ====================================
if (!isHTTPS) {
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
} else {
    const sslOptions = isPFX
        ? { pfx: fs.readFileSync("./cert/PFXFile.pfx"), passphrase }
        : { key: fs.readFileSync("./cert/privateKey.key"), cert: fs.readFileSync("./cert/certificate.crt") };

    https.createServer(sslOptions, app).listen(PORT, () => {
        console.log(`Listening on https://localhost:${PORT}`);
    });
}