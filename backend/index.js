import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database connection
const pool = new Pool({
  user: "admin",
  host: "db",
  database: "workout_tracker",
  password: "admin",
  port: 5432,
});

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend running!" });
});

// Add workout log
app.post("/api/workouts", async (req, res) => {
  const { name, sets, reps, weight } = req.body;
  try {
    await pool.query(
      "INSERT INTO user_workouts (name, sets, reps, weight) VALUES ($1, $2, $3, $4)",
      [name, sets, reps, weight]
    );
    res.json({ message: "Workout logged!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get user workouts (logged workouts)
app.get("/api/workouts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_workouts ORDER BY logged_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get reference workouts (for dropdown selection)
app.get("/api/reference-workouts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workouts ORDER BY name");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(4000, () => console.log("Backend running on port 4000"));
