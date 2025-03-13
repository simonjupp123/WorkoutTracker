const workouts = []
console.log(workouts)


function addWorkout() {
    const workoutEntryRows = document.querySelectorAll(".js-workout-entry-row"); 
    const workout = []
    workoutEntryRows.forEach((inputSet) => {
        const inputs = inputSet.querySelectorAll("input");
        const entry = {
            reps: inputs[0].value,
            distance: inputs[1].value,
            pace: inputs[2].value,
            notes: inputs[3].value,
        }
        workout.push(entry);

    });
    workouts.push(workout);
}

function addNewEntryLine(){
    const workoutEntryContainer = document.querySelector(".js-workout-entry"); 

    // Create a new div for the workout entry
    const newEntry = document.createElement("div");
    newEntry.classList.add("js-workout-entry-row");

    // Add inputs dynamically
    newEntry.innerHTML = `
      <input placeholder="Reps">
      <input placeholder="Distance">
      <input placeholder="Pace">
      <input placeholder="Notes">
    `;

    // Append the new div to the container
    workoutEntryContainer.appendChild(newEntry);
}