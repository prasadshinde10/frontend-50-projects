const form = document.getElementById('multiStepForm');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const progressFill = document.getElementById('progressFill');
const steps = document.querySelectorAll('.form-step');
const stepIndicators = document.querySelectorAll('.step');
const reviewContent = document.getElementById('reviewContent');

let currentStep = 1;
const totalSteps = steps.length;

const requiredFields = {
    1: ['firstName', 'lastName', 'dob', 'gender'],
    2: ['email', 'phone'],
    3: ['street', 'city', 'state', 'zip', 'country']
};

// Update progress bar and indicators
function updateProgress() {
    const progress = (currentStep / totalSteps) * 100;
    progressFill.style.width = progress + '%';
    
    stepIndicators.forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            step.classList.add('active');
        } else if (stepNum < currentStep) {
            step.classList.add('completed');
        }
    });
    
    updateButtonStates();
}

// Update button states
function updateButtonStates() {
    prevBtn.disabled = currentStep === 1;
    
    if (currentStep === totalSteps) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

// Validate required fields
function validateStep(step) {
    const fields = requiredFields[step] || [];
    let isValid = true;
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = field.parentElement.querySelector('.error-message');
        
        if (!field.value.trim()) {
            field.classList.add('error');
            errorElement.textContent = 'This field is required';
            errorElement.classList.add('show');
            isValid = false;
        } else {
            field.classList.remove('error');
            errorElement.classList.remove('show');
        }
    });
    
    // Email validation
    if (step === 2 && form.email.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email.value)) {
            form.email.classList.add('error');
            form.email.parentElement.querySelector('.error-message').textContent = 'Invalid email';
            form.email.parentElement.querySelector('.error-message').classList.add('show');
            isValid = false;
        }
    }
    
    // Phone validation
    if (step === 2 && form.phone.value) {
        const phoneRegex = /^[0-9\-\+\(\)\s]*$/;
        if (!phoneRegex.test(form.phone.value)) {
            form.phone.classList.add('error');
            form.phone.parentElement.querySelector('.error-message').textContent = 'Invalid phone number';
            form.phone.parentElement.querySelector('.error-message').classList.add('show');
            isValid = false;
        }
    }
    
    return isValid;
}

// Show specific step
function showStep(step) {
    steps.forEach(s => s.classList.remove('active'));
    document.querySelector(`[data-step="${step}"]`).classList.add('active');
    
    if (step === totalSteps) {
        generateReview();
    }
    
    updateProgress();
}

// Generate review
function generateReview() {
    const data = new FormData(form);
    const formData = Object.fromEntries(data);
    
    reviewContent.innerHTML = `
        <div class="review-section">
            <div class="review-title">Personal Information</div>
            <div class="review-item">
                <span class="review-label">First Name</span>
                <span class="review-value">${formData.firstName}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Last Name</span>
                <span class="review-value">${formData.lastName}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Date of Birth</span>
                <span class="review-value">${formData.dob}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Gender</span>
                <span class="review-value">${formData.gender}</span>
            </div>
        </div>
        
        <div class="review-section">
            <div class="review-title">Contact Information</div>
            <div class="review-item">
                <span class="review-label">Email</span>
                <span class="review-value">${formData.email}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Phone</span>
                <span class="review-value">${formData.phone}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Company</span>
                <span class="review-value">${formData.company || 'N/A'}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Position</span>
                <span class="review-value">${formData.position || 'N/A'}</span>
            </div>
        </div>
        
        <div class="review-section">
            <div class="review-title">Address Information</div>
            <div class="review-item">
                <span class="review-label">Street</span>
                <span class="review-value">${formData.street}</span>
            </div>
            <div class="review-item">
                <span class="review-label">City</span>
                <span class="review-value">${formData.city}</span>
            </div>
            <div class="review-item">
                <span class="review-label">State</span>
                <span class="review-value">${formData.state}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Zip Code</span>
                <span class="review-value">${formData.zip}</span>
            </div>
            <div class="review-item">
                <span class="review-label">Country</span>
                <span class="review-value">${formData.country}</span>
            </div>
        </div>
    `;
}

// Event listeners
prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
});

nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        }
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Form submitted successfully! ✅');
    form.reset();
    currentStep = 1;
    showStep(currentStep);
});

// Clear error on input
document.querySelectorAll('input, select').forEach(field => {
    field.addEventListener('input', () => {
        field.classList.remove('error');
        field.parentElement.querySelector('.error-message').classList.remove('show');
    });
});

// Initialize
updateProgress();
