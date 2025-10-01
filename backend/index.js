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

// Add exercise log
app.post("/api/exercises", async (req, res) => {
  const { exerciseName, sets, reps, weight } = req.body;
  try {
    await pool.query(
      "INSERT INTO workouts (exercise_name, sets, reps, weight) VALUES ($1, $2, $3, $4)",
      [exerciseName, sets, reps, weight]
    );
    res.json({ message: "Workout logged!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Get logs
app.get("/api/exercises", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM workouts ORDER BY logged_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(4000, () => console.log("Backend running on port 4000"));
