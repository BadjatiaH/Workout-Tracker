import React, { useState, useEffect } from "react";
import axios from "axios";

// Enhanced muscle visualization component
const MuscleVisualization = ({ muscleData }) => {
  const muscles = [
    // Upper body
    { name: 'shoulders', label: 'Shoulders', x: 50, y: 15, width: 25, height: 15, shape: 'ellipse' },
    { name: 'traps', label: 'Traps', x: 50, y: 20, width: 30, height: 8, shape: 'ellipse' },
    { name: 'chest', label: 'Chest', x: 50, y: 30, width: 35, height: 20, shape: 'ellipse' },
    { name: 'back', label: 'Back', x: 50, y: 35, width: 35, height: 18, shape: 'ellipse' },
    { name: 'lats', label: 'Lats', x: 50, y: 45, width: 25, height: 15, shape: 'ellipse' },
    
    // Arms
    { name: 'biceps', label: 'Biceps', x: 25, y: 40, width: 12, height: 20, shape: 'ellipse' },
    { name: 'triceps', label: 'Triceps', x: 75, y: 40, width: 12, height: 20, shape: 'ellipse' },
    { name: 'forearms', label: 'Forearms', x: 50, y: 60, width: 20, height: 12, shape: 'ellipse' },
    
    // Core
    { name: 'abs', label: 'Abs', x: 50, y: 55, width: 30, height: 15, shape: 'ellipse' },
    { name: 'lower_back', label: 'Lower Back', x: 50, y: 65, width: 30, height: 12, shape: 'ellipse' },
    
    // Lower body
    { name: 'glutes', label: 'Glutes', x: 50, y: 75, width: 25, height: 15, shape: 'ellipse' },
    { name: 'quads', label: 'Quads', x: 50, y: 85, width: 20, height: 20, shape: 'ellipse' },
    { name: 'hamstrings', label: 'Hamstrings', x: 50, y: 90, width: 20, height: 15, shape: 'ellipse' },
    { name: 'calves', label: 'Calves', x: 50, y: 95, width: 15, height: 12, shape: 'ellipse' },
    { name: 'adductors', label: 'Adductors', x: 40, y: 80, width: 8, height: 15, shape: 'ellipse' },
    { name: 'abductors', label: 'Abductors', x: 60, y: 80, width: 8, height: 15, shape: 'ellipse' }
  ];

  const getMuscleColor = (activation) => {
    if (activation === 0) return '#f8f9fa'; // Light gray for no activation
    if (activation < 0.3) return '#ff6b6b'; // Red for low activation
    if (activation < 0.7) return '#ffd93d'; // Yellow for medium activation
    return '#51cf66'; // Green for high activation
  };

  const getMuscleIntensity = (activation) => {
    return Math.max(0.4, activation * 0.8 + 0.2); // Better opacity range
  };

  const getMuscleGlow = (activation) => {
    if (activation === 0) return 'none';
    if (activation < 0.3) return '0 0 8px rgba(255, 107, 107, 0.6)';
    if (activation < 0.7) return '0 0 8px rgba(255, 217, 61, 0.6)';
    return '0 0 12px rgba(81, 207, 102, 0.8)';
  };

  return (
    <div style={{ 
      width: '300px', 
      height: '450px', 
      border: '3px solid #2c3e50', 
      borderRadius: '15px',
      padding: '15px',
      backgroundColor: '#ffffff',
      position: 'relative',
      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '25px', 
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: 'bold',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        💪 Muscle Activation
      </h3>
      
      {/* Enhanced human figure representation */}
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        height: '300px',
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRadius: '20px',
        border: '2px solid #dee2e6',
        overflow: 'hidden'
      }}>
        {/* Background human silhouette */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '20%',
          width: '60%',
          height: '80%',
          background: 'linear-gradient(45deg, #e9ecef, #f8f9fa)',
          borderRadius: '50px 50px 30px 30px',
          opacity: 0.3,
          border: '1px solid #ced4da'
        }}></div>
        
        {/* Muscle groups with enhanced styling */}
        {muscles.map((muscle) => {
          const activation = muscleData[muscle.name] || 0;
          const isEllipse = muscle.shape === 'ellipse';
          
          return (
            <div
              key={muscle.name}
              style={{
                position: 'absolute',
                left: `${muscle.x}%`,
                top: `${muscle.y}%`,
                width: `${muscle.width}px`,
                height: `${muscle.height}px`,
                borderRadius: isEllipse ? '50%' : '8px',
                backgroundColor: getMuscleColor(activation),
                opacity: activation > 0 ? Math.max(0.3, activation * 0.6 + 0.2) : 0.1,
                border: activation > 0 ? '2px solid rgba(255,255,255,0.9)' : '1px solid #ced4da',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 'bold',
                color: activation > 0.5 ? 'white' : '#495057',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                boxShadow: getMuscleGlow(activation),
                textShadow: activation > 0.5 ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none'
              }}
              title={`${muscle.label}: ${(activation * 100).toFixed(0)}% activation`}
            >
              {activation > 0.7 ? '🔥' : activation > 0.3 ? '⚡' : activation > 0 ? '💪' : '○'}
            </div>
          );
        })}
        
        {/* Muscle group labels */}
        {muscles.map((muscle) => {
          const activation = muscleData[muscle.name] || 0;
          if (activation > 0.1) { // Only show labels for activated muscles
            const labelColor = activation > 0.7 ? '#ffffff' : '#2c3e50';
            const labelBg = activation > 0.7 ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.95)';
            const labelBorder = activation > 0.7 ? 'rgba(255,255,255,0.3)' : '#dee2e6';
            
            // Position labels to the side to avoid overlap
            const isLeftSide = muscle.x < 50; // Muscles on left side get labels on left
            const labelX = isLeftSide ? muscle.x - 8 : muscle.x + 8;
            const labelTransform = isLeftSide ? 'translate(-100%, -50%)' : 'translate(0%, -50%)';
            
            return (
              <div
                key={`label-${muscle.name}`}
                style={{
                  position: 'absolute',
                  left: `${labelX}%`,
                  top: `${muscle.y}%`,
                  transform: labelTransform,
                  fontSize: '8px',
                  fontWeight: 'bold',
                  color: labelColor,
                  backgroundColor: labelBg,
                  padding: '2px 5px',
                  borderRadius: '4px',
                  border: `1px solid ${labelBorder}`,
                  whiteSpace: 'nowrap',
                  zIndex: 20,
                  textShadow: activation > 0.7 ? '1px 1px 2px rgba(0,0,0,0.8)' : 'none',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  minWidth: 'fit-content',
                  maxWidth: '60px',
                  textAlign: 'center'
                }}
              >
                {muscle.label}
              </div>
            );
          }
          return null;
        })}
      </div>
      
      {/* Enhanced Legend */}
      <div style={{ marginTop: '15px', fontSize: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#51cf66', 
            borderRadius: '50%', 
            marginRight: '8px',
            boxShadow: '0 0 6px rgba(81, 207, 102, 0.6)',
            border: '2px solid rgba(255,255,255,0.8)'
          }}></div>
          <span style={{ fontWeight: 'bold' }}>High (70%+)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#ffd93d', 
            borderRadius: '50%', 
            marginRight: '8px',
            boxShadow: '0 0 6px rgba(255, 217, 61, 0.6)',
            border: '2px solid rgba(255,255,255,0.8)'
          }}></div>
          <span style={{ fontWeight: 'bold' }}>Medium (30-70%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#ff6b6b', 
            borderRadius: '50%', 
            marginRight: '8px',
            boxShadow: '0 0 6px rgba(255, 107, 107, 0.6)',
            border: '2px solid rgba(255,255,255,0.8)'
          }}></div>
          <span style={{ fontWeight: 'bold' }}>Low (0-30%)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            width: '14px', 
            height: '14px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '50%', 
            marginRight: '8px',
            border: '1px solid #ced4da'
          }}></div>
          <span style={{ fontWeight: 'bold' }}>None</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [name, setName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [referenceWorkouts, setReferenceWorkouts] = useState([]);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState("");
  const [muscleData, setMuscleData] = useState({});

  const fetchWorkouts = async () => {
    const res = await axios.get("http://localhost:4000/api/workouts");
    setWorkouts(res.data);
  };

  const fetchReferenceWorkouts = async () => {
    const res = await axios.get("http://localhost:4000/api/reference-workouts");
    setReferenceWorkouts(res.data);
  };

  const calculateMuscleActivation = () => {
    const muscleTotals = {};
    const muscleCounts = {};
    
    // Initialize all muscles
    const allMuscles = ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'quads', 'hamstrings', 'glutes', 'calves', 'abs', 'forearms', 'traps', 'lats', 'lower_back', 'adductors', 'abductors'];
    allMuscles.forEach(muscle => {
      muscleTotals[muscle] = 0;
      muscleCounts[muscle] = 0;
    });

    // Calculate totals from recent workouts (last 10 workouts)
    const recentWorkouts = workouts.slice(0, 10);
    recentWorkouts.forEach(workout => {
      const referenceWorkout = referenceWorkouts.find(ref => ref.name === workout.name);
      if (referenceWorkout) {
        allMuscles.forEach(muscle => {
          const activation = referenceWorkout[muscle] || 0;
          const volume = workout.sets * workout.reps;
          muscleTotals[muscle] += activation * volume;
          muscleCounts[muscle] += volume;
        });
      }
    });

    // Calculate average activation per muscle
    const muscleAverages = {};
    allMuscles.forEach(muscle => {
      if (muscleCounts[muscle] > 0) {
        muscleAverages[muscle] = muscleTotals[muscle] / muscleCounts[muscle];
      } else {
        muscleAverages[muscle] = 0;
      }
    });

    // Normalize values (find max and scale everything relative to it)
    const maxActivation = Math.max(...Object.values(muscleAverages));
    if (maxActivation > 0) {
      Object.keys(muscleAverages).forEach(muscle => {
        muscleAverages[muscle] = muscleAverages[muscle] / maxActivation;
      });
    }

    setMuscleData(muscleAverages);
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
    // Validate that a workout is selected
    if (!selectedWorkoutId || !name) {
      alert("Please select a workout from the dropdown first!");
      return;
    }
    
    // Validate sets and reps
    if (!sets || !reps || parseInt(sets) <= 0 || parseInt(reps) <= 0) {
      alert("Please enter valid sets and reps (must be greater than 0)!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/workouts", {
        name: name,
        sets: parseInt(sets),
        reps: parseInt(reps),
        weight: parseFloat(weight) || null,
      });
      
      // Clear form after successful submission
      setSelectedWorkoutId("");
      setName("");
      setSets("");
      setReps("");
      setWeight("");
      
      fetchWorkouts();
    } catch (error) {
      alert("Error logging workout. Please try again.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
    fetchReferenceWorkouts();
  }, []);

  useEffect(() => {
    if (workouts.length > 0 && referenceWorkouts.length > 0) {
      calculateMuscleActivation();
    }
  }, [workouts, referenceWorkouts]);

  return (
    <div style={{ padding: "1rem", display: "flex", gap: "1rem", maxWidth: "100vw", overflow: "hidden" }}>
      {/* Left side - Form and workout list */}
      <div style={{ 
        flex: 1, 
        minWidth: "400px", 
        maxWidth: "calc(100vw - 350px)",
        padding: "2rem",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        margin: "1rem"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ 
            color: "#2c3e50", 
            fontSize: "2.5rem", 
            margin: "0 0 0.5rem 0",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)"
          }}>
            💪 Workout Tracker
          </h1>
          <p style={{ color: "#6c757d", fontSize: "1.1rem", margin: "0" }}>
            Track your workouts and visualize muscle activation
          </p>
        </div>

        {/* Form Section */}
        <div style={{ 
          backgroundColor: "#f8f9fa", 
          padding: "2rem", 
          borderRadius: "12px", 
          marginBottom: "2rem",
          border: "1px solid #e9ecef"
        }}>
          <h3 style={{ 
            textAlign: "center", 
            color: "#495057", 
            marginBottom: "1.5rem",
            fontSize: "1.3rem"
          }}>
            Log New Workout
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
            <select 
              value={selectedWorkoutId} 
              onChange={(e) => handleWorkoutSelection(e.target.value)}
              style={{ 
                padding: "0.75rem 1rem", 
                width: "300px", 
                fontSize: "1rem",
                border: "2px solid #dee2e6",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                color: "#495057"
              }}
              required
            >
              <option value="">Select a workout...</option>
              {referenceWorkouts.map((workout) => (
                <option key={workout.id} value={workout.id}>
                  {workout.name}
                </option>
              ))}
            </select>
            
            <div style={{ 
              display: "flex", 
              gap: "1rem", 
              flexWrap: "wrap", 
              justifyContent: "center",
              width: "100%",
              maxWidth: "400px"
            }}>
              <input 
                placeholder="Sets" 
                value={sets} 
                onChange={(e) => setSets(e.target.value)}
                style={{
                  padding: "0.75rem",
                  width: "80px",
                  fontSize: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "#ffffff"
                }}
              />
              <input 
                placeholder="Reps" 
                value={reps} 
                onChange={(e) => setReps(e.target.value)}
                style={{
                  padding: "0.75rem",
                  width: "80px",
                  fontSize: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "#ffffff"
                }}
              />
              <input 
                placeholder="Weight (lbs)" 
                value={weight} 
                onChange={(e) => setWeight(e.target.value)}
                style={{
                  padding: "0.75rem",
                  width: "120px",
                  fontSize: "1rem",
                  border: "2px solid #dee2e6",
                  borderRadius: "8px",
                  textAlign: "center",
                  backgroundColor: "#ffffff"
                }}
              />
            </div>
            
            <button 
              onClick={addWorkout}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "bold",
                backgroundColor: "#007bff",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(0,123,255,0.3)"
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#0056b3";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,123,255,0.4)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#007bff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 2px 8px rgba(0,123,255,0.3)";
              }}
            >
              Log Workout
            </button>
          </div>
        </div>

        {/* Workouts List Section */}
        <div>
          <h2 style={{ 
            textAlign: "center", 
            color: "#2c3e50", 
            marginBottom: "1.5rem",
            fontSize: "1.5rem"
          }}>
            📋 Workout History
          </h2>
          
          {workouts.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              color: "#6c757d", 
              fontSize: "1.1rem",
              padding: "2rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e9ecef"
            }}>
              No workouts logged yet. Start by selecting a workout above!
            </div>
          ) : (
            <div style={{ 
              maxHeight: "400px", 
              overflowY: "auto",
              border: "1px solid #e9ecef",
              borderRadius: "8px",
              backgroundColor: "#ffffff"
            }}>
              {workouts.map((workout, i) => (
                <div 
                  key={i}
                  style={{
                    padding: "1rem",
                    borderBottom: i < workouts.length - 1 ? "1px solid #e9ecef" : "none",
                    backgroundColor: i % 2 === 0 ? "#ffffff" : "#f8f9fa",
                    transition: "background-color 0.2s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ color: "#2c3e50", fontSize: "1.1rem" }}>
                        {workout.name}
                      </strong>
                      <div style={{ color: "#495057", fontSize: "0.95rem", marginTop: "0.25rem" }}>
                        {workout.sets}x{workout.reps} @ {workout.weight ? `${workout.weight} lbs` : 'bodyweight'}
                      </div>
                    </div>
                    <div style={{ 
                      color: "#6c757d", 
                      fontSize: "0.9rem",
                      textAlign: "right"
                    }}>
                      {new Date(workout.logged_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side - Muscle visualization */}
      <div style={{ 
        flex: 0, 
        width: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <MuscleVisualization muscleData={muscleData} />
      </div>
    </div>
  );
}

export default App;
