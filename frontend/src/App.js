import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [referenceWorkouts, setReferenceWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");

  const fetchWorkouts = async () => {
    const res = await axios.get("http://localhost:4000/api/workouts");
    setWorkouts(res.data);
  };

  const fetchReferenceWorkouts = async () => {
    const res = await axios.get("http://localhost:4000/api/reference-workouts");
    setReferenceWorkouts(res.data);
  };

  const handleWorkoutSelection = (workoutId) => {
    setSelectedWorkoutId(workoutId);
    const selectedWorkout = referenceWorkouts.find(workout => workout.id === parseInt(workoutId));
    if (selectedWorkout) {
      setName(selectedWorkout.name);
      // Clear other fields so user can input their own sets/reps/weight
      setSets("");
      setReps("");
      setWeight("");
    }
  };

  const addWorkout = async () => {
    await axios.post("http://localhost:4000/api/workouts", {
      name: name,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight) || null,
    });
    fetchWorkouts();
  };

  useEffect(() => {
    fetchWorkouts();
    fetchReferenceWorkouts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Workout Tracker</h1>
      <select 
        value={selectedWorkoutId} 
        onChange={(e) => handleWorkoutSelection(e.target.value)}
        style={{ marginBottom: "1rem", padding: "0.5rem", width: "200px" }}
      >
        <option value="">Select a workout...</option>
        {referenceWorkouts.map((workout) => (
          <option key={workout.id} value={workout.id}>
            {workout.name}
          </option>
        ))}
      </select>
      <br />
      <input placeholder="Workout Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} />
      <input placeholder="Reps" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input placeholder="Weight (lbs) - leave empty for bodyweight" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button onClick={addWorkout}>Log Workout</button>

      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, i) => (
          <li key={i}>
            <strong>{workout.name}</strong> - {workout.sets}x{workout.reps} @ {workout.weight ? `${workout.weight} lbs` : 'bodyweight'} | 
            Logged: {new Date(workout.logged_at).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
