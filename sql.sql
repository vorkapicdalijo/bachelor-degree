CREATE TABLE Exercise
(
  exercise_id SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  imageUrl VARCHAR(300),
  description VARCHAR(400),
  PRIMARY KEY (exercise_id),
  UNIQUE (name)
);

CREATE TABLE AppUser
(
  user_id SERIAL NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(200) NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE (email)
);

CREATE TABLE Workout
(
  name VARCHAR(100) NOT NULL,
  workout_id SERIAL NOT NULL,
  duration INT,
  complexity VARCHAR(100),
  user_id INT NOT NULL,
  PRIMARY KEY (workout_id),
  UNIQUE (name),
  FOREIGN KEY (user_id) REFERENCES AppUser(user_id)
  ON DELETE CASCADE
);

CREATE TABLE ExerciseWorkout
(
  workout_id INT NOT NULL,
  exercise_id INT NOT NULL,
  sets INT NOT NULL,
  reps INT NOT NULL,
  PRIMARY KEY (workout_id, exercise_id),
  FOREIGN KEY (workout_id) REFERENCES Workout(workout_id)
  ON DELETE CASCADE,
  FOREIGN KEY (exercise_id) REFERENCES Exercise(exercise_id)
  ON DELETE CASCADE
);

CREATE TABLE schedule
(
  starttime TIMESTAMP NOT NULL,
  endtime TIMESTAMP NOT NULL,
  workout_id INT NOT NULL,
  schedule_id SERIAL NOT NULL,
  user_id INT NOT NULL,
  PRIMARY KEY (schedule_id),
  FOREIGN KEY (workout_id) REFERENCES Workout(workout_id)
  ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES AppUser(user_id)
  ON DELETE CASCADE
);




