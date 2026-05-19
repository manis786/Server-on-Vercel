import express from "express";
import connectDB from "./config/connectDB.js";
import config from "./config/config.js";
import todosRoutes from "./routes/todos.routes.js";

const app = express();
app.use(express.json());

// ⚡ Vercel / Serverless Fix: Database connection ko as a middleware inject karein
app.use(async (req, res, next) => {
  try {
    await connectDB(); // Yeh ab har request par check karega aur await karega
    next();
  } catch (error) {
    res.status(500).json({ error: "Database Connection Failed", details: error.message });
  }
});

// Todos API
app.use("/api/todos", todosRoutes);

// Base Route just for checking server status
app.get("/", (req, res) => {
  res.send("Server is running perfectly!");
});

// Export default app for Vercel (app.listen local ke liye kaam karega)
if (process.env.NODE_ENV !== "production") {
  app.listen(config.PORT, () => {
    console.log(`Server Is UP and Running on PORT : ${config.PORT}`);
  });
}

export default app;