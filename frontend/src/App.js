import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const res = await axios.get("http://localhost:4000/api/exercises");
    setLogs(res.data);
  };

  const addExercise = async () => {
    await axios.post("http://localhost:4000/api/exercises", {
      exerciseName: exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
    });
    fetchLogs();
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Workout Tracker</h1>
      <input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} />
      <input placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input placeholder="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button onClick={addExercise}>Log Workout</button>

      <h2>Logs</h2>
      <ul>
        {logs.map((log, i) => (
          <li key={i}>
            {log.exercise_name} - {log.sets}x{log.reps} @ {log.weight} lbs
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
