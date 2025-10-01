-- Create workouts table
CREATE TABLE IF NOT EXISTS workouts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_minutes INT NOT NULL,
    calories_burned INT,
    logged_at TIMESTAMP DEFAULT NOW()
);

-- Insert some sample data
INSERT INTO workouts (name, duration_minutes, calories_burned)
VALUES
('Morning Run', 30, 250),
('Evening Yoga', 45, 150);
