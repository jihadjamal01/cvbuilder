// Load all CV data from localStorage
const personalDetails = JSON.parse(localStorage.getItem('cvDetails') || '{}');
const bioData = JSON.parse(localStorage.getItem('cvBio') || '{}');
const experiences = JSON.parse(localStorage.getItem('cvExperiences') || '[]');
const education = JSON.parse(localStorage.getItem('cvEducation') || '[]');
const skills = JSON.parse(localStorage.getItem('cvSkills') || '[]');
const languages = JSON.parse(localStorage.getItem('cvLanguages') || '[]');
const certifications = JSON.parse(localStorage.getItem('cvCertifications') || '[]');

// Helper function to safely get nested properties
const getNestedValue = (obj, path, defaultValue = '') => {
    return path.split('.').reduce((acc, part) => (acc && acc[part] ? acc[part] : defaultValue), obj);
};

// Populate personal details
document.getElementById('full-name').textContent = 
    `${getNestedValue(personalDetails, 'firstName')} ${getNestedValue(personalDetails, 'lastName')}`.trim();
document.getElementById('job-title').textContent = getNestedValue(personalDetails, 'jobTitle');
document.getElementById('email').textContent = getNestedValue(personalDetails, 'email');
document.getElementById('phone').textContent = 
    `${getNestedValue(personalDetails, 'phone.countryCode', '')} ${getNestedValue(personalDetails, 'phone.number', '')}`.trim();
document.getElementById('address').textContent = getNestedValue(personalDetails, 'address');

// Load profile picture if available
if (personalDetails.profilePicture) {
    document.getElementById('profile-image').src = personalDetails.profilePicture;
}

// Populate professional summary
const professionalSummary = getNestedValue(bioData, 'professionalSummary');
const careerObjective = getNestedValue(bioData, 'careerObjective');

let bioHtml = '';
if (professionalSummary) {
    bioHtml += `<p class="mb-3">${professionalSummary}</p>`;
}
if (careerObjective) {
    bioHtml += `<p class="mb-0">${careerObjective}</p>`;
}

document.getElementById('professional-bio').innerHTML = bioHtml || '<p class="text-muted">No professional summary added</p>';

// Populate work experience
const experienceHtml = experiences
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .map(exp => `
        <div class="experience-item">
            <h4 class="mb-1">${exp.jobTitle || ''}</h4>
            <h5 class="h6 text-muted mb-2">${exp.company || ''}</h5>
            <p class="mb-2"><small class="text-muted">${exp.startDate || ''} - ${exp.currentJob ? 'Present' : (exp.endDate || '')}</small></p>
            <p class="mb-0">${exp.responsibilities || ''}</p>
        </div>
    `).join('');
document.getElementById('experience-section').innerHTML = experienceHtml || '<p class="text-muted">No work experience added</p>';

// Populate education
const educationHtml = education
    .sort((a, b) => b.startYear - a.startYear)
    .map(edu => `
        <div class="education-item">
            <h4 class="mb-1">${edu.degree || ''}</h4>
            <h5 class="h6 text-muted mb-2">${edu.institution || ''}</h5>
            <p class="mb-2"><small class="text-muted">${edu.startYear || ''} - ${edu.currentEducation ? 'Present' : (edu.endYear || '')}</small></p>
            <p class="mb-1">Field of Study: ${edu.field || ''}</p>
            ${edu.achievements ? `<p class="mb-0">Achievements: ${edu.achievements}</p>` : ''}
        </div>
    `).join('');
document.getElementById('education-section').innerHTML = educationHtml || '<p class="text-muted">No education history added</p>';

// Populate skills (combined technical and soft skills)
const skillsHtml = skills
    .map(skill => `<span class="skill-badge">${skill}</span>`)
    .join('');
document.getElementById('technical-skills').innerHTML = skillsHtml || '<p class="text-muted">No skills added</p>';
document.getElementById('soft-skills').style.display = 'none'; // Hide soft skills section since we're using combined skills

// Populate languages
const languagesHtml = languages
    .map(lang => `<span class="skill-badge">${lang.language} (${lang.proficiency})</span>`)
    .join('');
document.getElementById('languages-section').innerHTML = languagesHtml || '<p class="text-muted">No languages added</p>';

// Populate certifications
const certificationsHtml = certifications
    .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
    .map(cert => `
        <div class="mb-3">
            <h5 class="h6 mb-1">${cert.name || ''}</h5>
            <p class="mb-1"><small class="text-muted">Issuing Organization: ${cert.organization || ''}</small></p>
            <p class="mb-0"><small class="text-muted">Date: ${cert.issueDate || ''}${cert.expiryDate ? ' - ' + cert.expiryDate : ''}</small></p>
            ${cert.credentialId ? `<p class="mb-0"><small class="text-muted">Credential ID: ${cert.credentialId}</small></p>` : ''}
        </div>
    `).join('');
document.getElementById('certifications-section').innerHTML = certificationsHtml || '<p class="text-muted">No certifications added</p>'; 