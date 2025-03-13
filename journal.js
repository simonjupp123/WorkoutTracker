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
    document.querySelector(".js-workout-entry-date").value = "";
    document.querySelector(".js-workout-entry").innerHTML = "";
    addNewEntryLine();
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

function delWorkoutEntry(id) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    if (workouts.length === 0) {
        return;
    }
    else{
        workouts.splice(id, 1);
    }
    localStorage.setItem("workouts", JSON.stringify(workouts));
    renderWorkouts();
}

//edit functions:
//Can refactor this so that the add workout process tobegin with is the same as the edit and save
function openEditModal(index) {
    let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
    const selectedWorkout = workouts[index];

    // Set date in modal
    document.getElementById("editWorkoutDate").value = selectedWorkout.date;

    // Populate workout details
    const editWorkoutEntries = document.getElementById("editWorkoutEntries");
    editWorkoutEntries.innerHTML = ""; // Clear previous entries

    selectedWorkout.workoutData.forEach((entry, entryIndex) => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("edit-workout-entry");

        newEntry.innerHTML = `
          <input placeholder="Reps" value="${entry.Reps || ''}" data-key="Reps" data-index="${entryIndex}">
          <input placeholder="Distance" value="${entry.Distance || ''}" data-key="Distance" data-index="${entryIndex}">
          <input placeholder="Pace" value="${entry.Pace || ''}" data-key="Pace" data-index="${entryIndex}">
          <input placeholder="Notes" value="${entry.Notes || ''}" data-key="Notes" data-index="${entryIndex}">
        `;

        editWorkoutEntries.appendChild(newEntry);
    });

    // Store index for saving
    document.getElementById("editWorkoutModal").dataset.index = index;

    document.getElementById("editWorkoutModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editWorkoutModal").style.display = "none";
}

function saveEditedWorkout() {
    let workouts = JSON.parse(localStorage.getItem("workouts"))|| [];

    const modal = document.getElementById("editWorkoutModal");
    const index = modal.dataset.index;
    const updatedDate = document.getElementById("editWorkoutDate").value;

    const updatedWorkoutData = [];
    document.querySelectorAll("#editWorkoutEntries .edit-workout-entry").forEach(entryDiv => {
        const inputs = entryDiv.querySelectorAll("input");
        const entry = {};
        inputs.forEach(input => {
            entry[input.getAttribute("data-key")] = input.value;
        });
        updatedWorkoutData.push(entry);
    });
    workouts[index] = {
        date: updatedDate,
        workoutData: updatedWorkoutData
    };
    localStorage.setItem("workouts", JSON.stringify(workouts));

    closeEditModal();
    renderWorkouts();
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
        // console.log(workout);
        const {date, workoutData} = workout;
        // console.log(date,workoutData);
        res += `<div class="workout-entry">
                    <h4>Workout ${date}<button onclick="openEditModal(${index})" class="edit-button">Edit</button><button onclick="delWorkoutEntry(${index})" class="delete-button">Delete</button></h4> 
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