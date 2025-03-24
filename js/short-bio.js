document.getElementById('bioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bioData = {
        professionalSummary: document.getElementById('professional-summary').value,
        careerObjective: document.getElementById('career-objective').value
    };
    
    // Save to localStorage
    localStorage.setItem('cvBio', JSON.stringify(bioData));
    
    // Redirect to next page
    window.location.href = 'experience.html';
});

// Load saved data if it exists
window.addEventListener('load', function() {
    const savedBio = localStorage.getItem('cvBio');
    if (savedBio) {
        const bioData = JSON.parse(savedBio);
        document.getElementById('professional-summary').value = bioData.professionalSummary || '';
        document.getElementById('career-objective').value = bioData.careerObjective || '';
    }
}); 