// Select DOM elements
const registerForm = document.getElementById('registerForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

// Event listener for form submission
registerForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    clearErrors();

    let hasError = false;

    // Validate name
    if (nameInput.value.trim() === '') {
        setError(nameInput, 'Name is required.');
        hasError = true;
    }

    // Validate email
    if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
        setError(emailInput, 'A valid email is required.');
        hasError = true;
    }

    // Validate password
    if (passwordInput.value.trim() === '' || passwordInput.value.length < 6) {
        setError(passwordInput, 'Password must be at least 6 characters long.');
        hasError = true;
    }

    // If no errors, save user to localStorage
    if (!hasError) {
        const username = generateUsername(nameInput.value);

        // Save user details to localStorage
        saveUser(username, emailInput.value.trim(), passwordInput.value.trim());

        // Show success message and redirect to login
        alert(`Registration successful!\nYour username is: ${username}`);
        window.location.href = 'login.html'; // Redirect to login page
    }
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    return re.test(email);
}

// Helper function to display an error
function setError(input, message) {
    input.classList.add('error'); // Add error styling
    errorMessage.textContent = message; // Show the error message
    errorMessage.style.display = 'block'; // Make the error visible
    input.focus(); // Focus on the problematic input
}

// Helper function to clear errors
function clearErrors() {
    const inputs = [nameInput, emailInput, passwordInput];
    inputs.forEach(input => input.classList.remove('error')); // Remove error styles
    errorMessage.style.display = 'none'; // Hide the error message
}

// Helper function to generate a username from the full name
function generateUsername(fullName) {
    return fullName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '') // Remove non-alphanumeric characters
        .substring(0, 12); // Limit username to 12 characters
}

// Save user details to localStorage
function saveUser(username, email, password) {
    const newUser = { username, email, password };

    // Retrieve existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username or email already exists
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
        alert('Username or email already exists. Please choose a different one.');
        return;
    }

    // Add the new user to the users array
    users.push(newUser);

    // Save updated users array back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
}
