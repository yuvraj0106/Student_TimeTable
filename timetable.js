document.addEventListener("DOMContentLoaded", function() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timetable = document.querySelector('.timetable');
    const activityList = document.querySelector('.activity-list');
    const assignmentForm = document.getElementById('assignmentForm');
    const queryInput = document.getElementById('queryInput');
    const queryButton = document.getElementById('queryButton');
    const queryResult = document.getElementById('queryResult');

    // Sample assignments and activities
    const activitiesData = {
        Monday: ["Math Assignment", "Science Quiz"],
        Tuesday: ["English Essay", "Art Project"],
        Wednesday: ["History Presentation", "Chemistry Lab"],
        Thursday: ["Physics Assignment", "Geography Test"],
        Friday: ["Literature Assignment", "Music Rehearsal"],
        Saturday: ["Sports Practice", "Club Meeting"],
        Sunday: ["Relaxation", "Family Time"]
    };

    // Function to generate timetable
    function generateTimetable() {
        timetable.innerHTML = ''; // Clear previous timetable
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('timetable-item');
            dayElement.textContent = day;
            dayElement.addEventListener('click', function() {
                showActivities(day);
            });
            dayElement.setAttribute('draggable', true); // Enable dragging
            timetable.appendChild(dayElement);
        });
    }

    // Function to display activities for a specific day
    function showActivities(day) {
        const activities = activitiesData[day];
        activityList.innerHTML = ''; // Clear previous activity list
        activities.forEach(activity => {
            const activityItem = document.createElement('li');
            activityItem.textContent = activity;
            activityItem.setAttribute('draggable', true); // Enable dragging
            activityList.appendChild(activityItem);
        });
    }

    // Function to handle form submission for adding assignments
    assignmentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const assignmentName = document.getElementById('assignmentName').value;
        const dueDate = document.getElementById('dueDate').value;
        const day = new Date(dueDate).toLocaleDateString('en-US', { weekday: 'long' });
        if (activitiesData.hasOwnProperty(day)) {
            activitiesData[day].push(assignmentName);
        } else {
            activitiesData[day] = [assignmentName];
        }
        generateTimetable();
        showActivities(day);
        assignmentForm.reset();
    });

    // Function to handle query submission
    queryButton.addEventListener('click', function() {
        const query = queryInput.value;
        if (query.trim() !== '') {
            queryResult.textContent = `Your query "${query}" has been received. We will get back to you soon.`;
            queryInput.value = ''; // Clear input field
            // Remove message after 3 seconds
            setTimeout(() => {
                queryResult.textContent = '';
            }, 3000);
        }
    });

    // Drag and drop functionality
    let draggedItem = null;

    function handleDragStart(event) {
        draggedItem = event.target;
        event.dataTransfer.setData('text/plain', event.target.textContent);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        if (event.target.classList.contains('timetable-item')) {
            event.target.appendChild(document.createTextNode(event.dataTransfer.getData('text/plain')));
            draggedItem.parentNode.removeChild(draggedItem);
        }
    }

    timetable.addEventListener('dragstart', handleDragStart);
    timetable.addEventListener('dragover', handleDragOver);
    timetable.addEventListener('drop', handleDrop);

    activityList.addEventListener('dragstart', handleDragStart);
    activityList.addEventListener('dragover', handleDragOver);
    activityList.addEventListener('drop', handleDrop);

    // Call generateTimetable function
    generateTimetable();
});
