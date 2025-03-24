// Handle profile picture upload
document.getElementById('upload-photo').addEventListener('click', function() {
    document.getElementById('photo-input').click();
});

document.getElementById('photo-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('profile-image').src = event.target.result;
            // Save the image data to localStorage
            localStorage.setItem('cvProfilePicture', event.target.result);
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
document.getElementById('detailsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const personalDetails = {
        jobTitle: document.getElementById('job-title').value,
        firstName: document.getElementById('first-name').value,
        lastName: document.getElementById('last-name').value,
        email: document.getElementById('email').value,
        phone: {
            countryCode: document.getElementById('country-code').value,
            number: document.getElementById('phone').value
        },
        address: document.getElementById('address').value,
        profilePicture: localStorage.getItem('cvProfilePicture') || ''
    };
    
    // Save to localStorage
    localStorage.setItem('cvDetails', JSON.stringify(personalDetails));
    
    // Redirect to next page
    window.location.href = 'short-bio.html';
});

// Load saved data if it exists
window.addEventListener('load', function() {
    const savedDetails = localStorage.getItem('cvDetails');
    if (savedDetails) {
        const details = JSON.parse(savedDetails);
        document.getElementById('job-title').value = details.jobTitle || '';
        document.getElementById('first-name').value = details.firstName || '';
        document.getElementById('last-name').value = details.lastName || '';
        document.getElementById('email').value = details.email || '';
        document.getElementById('country-code').value = details.phone?.countryCode || '+880';
        document.getElementById('phone').value = details.phone?.number || '';
        document.getElementById('address').value = details.address || '';
        
        // Load profile picture if exists
        if (details.profilePicture) {
            document.getElementById('profile-image').src = details.profilePicture;
        }
    }
}); 