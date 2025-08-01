const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Database connection
require('./Connection/conn');

// Routes
const AuthRoutes = require('./Routes/userRoutes');
const VideoRoutes = require("./Routes/videoRoutes");
const CommentRoutes = require("./Routes/commentRoutes");

app.use('/auth', AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

// Health check route
app.get("/", (req, res) => {
    res.send("✅ Backend API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
