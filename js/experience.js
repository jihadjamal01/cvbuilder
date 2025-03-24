let experiences = JSON.parse(localStorage.getItem('cvExperiences') || '[]');

function updateExperienceList() {
    const list = document.getElementById('experience-list');
    list.innerHTML = '';
    
    experiences.forEach((exp, index) => {
        const template = document.getElementById('experience-entry-template');
        const entry = template.content.cloneNode(true);
        
        // Fill in the template
        entry.querySelector('.card-title').textContent = exp.jobTitle;
        entry.querySelector('.company').textContent = exp.company;
        entry.querySelector('.location').textContent = exp.location;
        entry.querySelector('.dates').textContent = `${exp.startDate} - ${exp.currentJob ? 'Present' : exp.endDate}`;
        entry.querySelector('.responsibilities').textContent = exp.responsibilities;
        
        // Add delete functionality
        entry.querySelector('.delete-btn').addEventListener('click', () => deleteExperience(index));
        
        list.appendChild(entry);
    });
}

function deleteExperience(index) {
    experiences.splice(index, 1);
    localStorage.setItem('cvExperiences', JSON.stringify(experiences));
    updateExperienceList();
}

// Handle current job checkbox
document.getElementById('current-job').addEventListener('change', function(e) {
    const endDateInput = document.getElementById('end-date');
    endDateInput.disabled = e.target.checked;
    if (e.target.checked) {
        endDateInput.value = '';
    }
});

// Handle experience form submission
document.getElementById('experienceForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const experience = {
        jobTitle: document.getElementById('job-title').value,
        company: document.getElementById('company').value,
        location: document.getElementById('location').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('current-job').checked ? '' : document.getElementById('end-date').value,
        currentJob: document.getElementById('current-job').checked,
        responsibilities: document.getElementById('responsibilities').value
    };
    
    experiences.push(experience);
    localStorage.setItem('cvExperiences', JSON.stringify(experiences));
    
    // Reset form
    this.reset();
    updateExperienceList();
});

// Handle Save & Next button
document.getElementById('next-btn').addEventListener('click', function() {
    // Save current state if needed
    localStorage.setItem('cvExperiences', JSON.stringify(experiences));
    
    // Redirect to next page
    window.location.href = 'education.html';
});

// Load saved experiences when page loads
window.addEventListener('load', function() {
    updateExperienceList();
}); 