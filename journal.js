function addWorkout() {
    const workoutEntryRows = document.querySelectorAll(".js-workout-entry-row"); 
    const workoutData = [];
    const workoutDate = document.querySelector(".js-workout-entry-date").value;
    workoutEntryRows.forEach((inputSet) => {
        const inputs = inputSet.querySelectorAll("input");
        const entry = {};
        inputs.forEach((input) => {
            entry[input.placeholder] = input.value
        })
        workoutData.push(entry);
    });

    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

    // Add the new workout
    const workout = {
        date: workoutDate,
        workoutData: workoutData
    }
    workouts.push(workout);

    // Save back to localStorage
    localStorage.setItem("workouts", JSON.stringify(workouts));
    renderWorkouts();
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

function delWorkoutEntry() {

}


function renderWorkouts() {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    // console.log(workouts[0][0].Reps);
    if (workouts.length === 0) {
        document.querySelector('.js-workout-log').innerHTML = "<p>No workouts logged yet.</p>";
        return;
    }
    let res = "<h3>Past Workouts</h3>"; //template string to create our grid of past workouts for now
    workouts.forEach((workout, index) => {
        console.log(workout);
        const {date, workoutData} = workout;
        console.log(date,workoutData);
        res += `<div class="workout-entry">
                    <h4>Workout ${date}<button>Edit</button><button>Delete</button></h4> 
                    <ul>`;
        
        workoutData.forEach(entry => {
            res += `<li>`;
        
            Object.keys(entry).forEach((key,index) => {
                if (index+1 == Object.keys(entry).length){ 
                    res += `${key}: ${entry[key] || "-"}`;
                }
                else{
                    res += `${key}: ${entry[key] || "-"}, `;
                }
            })
            res += `</li>`;
        });

        res += `</ul></div>`;
    });

    document.querySelector('.js-workout-log').innerHTML = res

}

renderWorkouts();