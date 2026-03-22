// script.js

// Function for problem registration
function registerProblem(problem) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.push(problem);
    localStorage.setItem('problems', JSON.stringify(problems));
}

// Function to display problems on a map
function displayMap() {
    var map = L.map('map').setView([-23.55052, -46.633308], 13); // Example coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    problems.forEach(function (problem) {
        L.marker([problem.latitude, problem.longitude]).addTo(map)
            .bindPopup(problem.description)
            .openPopup();
    });
}

// Function to filter problems by status
function filterProblems(status) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    return problems.filter(problem => problem.status === status);
}

// Function to sort problems by date
function sortProblems() {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    return problems.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
}

// Function to track status
function updateStatus(problemId, newStatus) {
    let problems = JSON.parse(localStorage.getItem('problems')) || [];
    const problem = problems.find(p => p.id === problemId);
    if (problem) {
        problem.status = newStatus;
        localStorage.setItem('problems', JSON.stringify(problems));
    }
}

// Example Usage
document.getElementById('register-problem').addEventListener('click', function() {
    const problem = { 
        id: Date.now(), 
        description: document.getElementById('description').value, 
        status: "new",
        latitude: "your_latitude", // set appropriate values
        longitude: "your_longitude", // set appropriate values
        date: new Date().toISOString()
    };
    registerProblem(problem);
});
