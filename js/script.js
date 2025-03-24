// Handle profile picture upload
document.querySelector('.profile-section button').addEventListener('click', function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.querySelector('.profile-section img').src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    input.click();
});

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        jobTitle: document.getElementById('job-title').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value
    };
    
    // Save to localStorage for now (you can modify this to save to a backend later)
    localStorage.setItem('cvDetails', JSON.stringify(formData));
    
    // Show success message
    alert('Details saved successfully!');
    
    // You can redirect to the next page (Short Bio) here
    // window.location.href = 'short-bio.html';
}); 