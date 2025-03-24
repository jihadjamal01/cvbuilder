// Initialize data from localStorage
let skills = JSON.parse(localStorage.getItem('cvSkills') || '[]');
let languages = JSON.parse(localStorage.getItem('cvLanguages') || '[]');
let certifications = JSON.parse(localStorage.getItem('cvCertifications') || '[]');

// Update skills display
function updateSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    skills.forEach((skill, index) => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.innerHTML = `
            ${skill}
            <span class="remove-skill" onclick="removeSkill(${index})">×</span>
        `;
        container.appendChild(badge);
    });
}

// Update languages display
function updateLanguages() {
    const container = document.getElementById('languages-container');
    container.innerHTML = '';
    
    languages.forEach((lang, index) => {
        const badge = document.createElement('span');
        badge.className = 'skill-badge';
        badge.innerHTML = `
            ${lang.language} - ${lang.proficiency}
            <span class="remove-skill" onclick="removeLanguage(${index})">×</span>
        `;
        container.appendChild(badge);
    });
}

// Update certifications display
function updateCertifications() {
    const container = document.getElementById('certifications-container');
    container.innerHTML = '';
    
    certifications.forEach((cert, index) => {
        const template = document.getElementById('certification-entry-template');
        const entry = template.content.cloneNode(true);
        
        entry.querySelector('.card-title').textContent = cert.name;
        entry.querySelector('.organization').textContent = cert.organization;
        entry.querySelector('.dates').textContent = `${cert.issueDate}${cert.expiryDate ? ' - ' + cert.expiryDate : ''}`;
        if (cert.credentialId) {
            entry.querySelector('.credential-id').textContent = `Credential ID: ${cert.credentialId}`;
        }
        
        entry.querySelector('.delete-btn').addEventListener('click', () => removeCertification(index));
        
        container.appendChild(entry);
    });
}

// Remove functions
function removeSkill(index) {
    skills.splice(index, 1);
    localStorage.setItem('cvSkills', JSON.stringify(skills));
    updateSkills();
}

function removeLanguage(index) {
    languages.splice(index, 1);
    localStorage.setItem('cvLanguages', JSON.stringify(languages));
    updateLanguages();
}

function removeCertification(index) {
    certifications.splice(index, 1);
    localStorage.setItem('cvCertifications', JSON.stringify(certifications));
    updateCertifications();
}

// Handle skills input
function addSkill(skillText) {
    const skill = skillText.trim();
    if (skill && !skills.includes(skill)) {
        skills.push(skill);
        localStorage.setItem('cvSkills', JSON.stringify(skills));
        updateSkills();
        return true;
    }
    return false;
}

// Handle skills form
document.getElementById('skillsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const skillInput = document.getElementById('skill-input');
    if (addSkill(skillInput.value)) {
        skillInput.value = '';
    }
});

// Add skill on Enter key
document.getElementById('skill-input').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission
        if (addSkill(this.value)) {
            this.value = '';
        }
    }
});

// Handle language form
document.getElementById('languageForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const language = document.getElementById('language-input').value.trim();
    const proficiency = document.getElementById('proficiency-level').value;
    
    if (language && proficiency) {
        languages.push({ language, proficiency });
        localStorage.setItem('cvLanguages', JSON.stringify(languages));
        this.reset();
        updateLanguages();
    }
});

// Handle certification form
document.getElementById('certificationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const certification = {
        name: document.getElementById('certification-name').value,
        organization: document.getElementById('issuing-organization').value,
        issueDate: document.getElementById('issue-date').value,
        expiryDate: document.getElementById('expiry-date').value,
        credentialId: document.getElementById('credential-id').value
    };
    
    certifications.push(certification);
    localStorage.setItem('cvCertifications', JSON.stringify(certifications));
    this.reset();
    updateCertifications();
});

// Handle Preview button
document.getElementById('preview-btn').addEventListener('click', function() {
    // Save all current data
    localStorage.setItem('cvSkills', JSON.stringify(skills));
    localStorage.setItem('cvLanguages', JSON.stringify(languages));
    localStorage.setItem('cvCertifications', JSON.stringify(certifications));
    
    // Redirect to preview page
    window.location.href = 'preview.html';
});

// Load saved data when page loads
window.addEventListener('load', function() {
    updateSkills();
    updateLanguages();
    updateCertifications();
}); 