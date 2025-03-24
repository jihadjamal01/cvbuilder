let educations = JSON.parse(localStorage.getItem('cvEducation') || '[]');

function updateEducationList() {
    const list = document.getElementById('education-list');
    list.innerHTML = '';
    
    educations.forEach((edu, index) => {
        const template = document.getElementById('education-entry-template');
        const entry = template.content.cloneNode(true);
        
        // Fill in the template
        entry.querySelector('.card-title').textContent = edu.degree;
        entry.querySelector('.institution').textContent = edu.institution;
        entry.querySelector('.location').textContent = edu.location;
        entry.querySelector('.dates').textContent = `${edu.startDate} - ${edu.currentEducation ? 'Present' : edu.endDate}`;
        entry.querySelector('.description').textContent = edu.description;
        
        // Add delete functionality
        entry.querySelector('.delete-btn').addEventListener('click', () => deleteEducation(index));
        
        list.appendChild(entry);
    });
}

function deleteEducation(index) {
    educations.splice(index, 1);
    localStorage.setItem('cvEducation', JSON.stringify(educations));
    updateEducationList();
}

// Handle current education checkbox
document.getElementById('current-education').addEventListener('change', function(e) {
    const endDateInput = document.getElementById('end-date');
    endDateInput.disabled = e.target.checked;
    if (e.target.checked) {
        endDateInput.value = '';
    }
});

// Handle education form submission
document.getElementById('educationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const education = {
        degree: document.getElementById('degree').value,
        institution: document.getElementById('institution').value,
        location: document.getElementById('location').value,
        startDate: document.getElementById('start-date').value,
        endDate: document.getElementById('current-education').checked ? '' : document.getElementById('end-date').value,
        currentEducation: document.getElementById('current-education').checked,
        description: document.getElementById('description').value
    };
    
    educations.push(education);
    localStorage.setItem('cvEducation', JSON.stringify(educations));
    
    // Reset form
    this.reset();
    updateEducationList();
});

// Handle Save & Next button
document.getElementById('next-btn').addEventListener('click', function() {
    // Save current state if needed
    localStorage.setItem('cvEducation', JSON.stringify(educations));
    
    // Redirect to next page
    window.location.href = 'skills.html';
});

// Load saved education entries when page loads
window.addEventListener('load', function() {
    updateEducationList();
}); 