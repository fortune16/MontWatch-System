// Retrieve all users from localStorage
function getRegisteredUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

// Save a new user to localStorage
function saveUser(username, password) {
    const newUser = { username, password };

    // Get existing users or initialize an empty array
    const users = getRegisteredUsers();

    // Check if username already exists
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        alert('Username already exists. Please choose a different one.');
        return;
    }

    // Add the new user to the array and save it back to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
}

// Handle login functionality
function handleLogin(event) {
    event.preventDefault();

    // Get DOM elements
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Clear previous errors
    clearErrors(username, password, errorMessage);

    // Retrieve users from localStorage
    const users = getRegisteredUsers();

    // Find user by username
    const registeredUser = users.find(user => user.username === username.value.trim());

    // Check if username exists
    if (!registeredUser) {
        showError('Username not found.', errorMessage, username);
        return;
    }

    // Validate the password
    if (registeredUser.password !== password.value.trim()) {
        showError('Incorrect password.', errorMessage, password);
        return;
    }

    // Successful login
    alert(`Welcome back, ${registeredUser.username}!`);
    window.location.href = 'landing.html'; // Redirect to landing page
}

// Handle registration functionality
function handleRegistration(event) {
    event.preventDefault();

    // Get DOM elements
    const newUsername = document.getElementById('newUsername').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    if (!newUsername || !newPassword) {
        alert('Please fill in both fields to register.');
        return;
    }

    saveUser(newUsername, newPassword);
    alert('Account successfully created! You can now log in.');
    window.location.href = 'login.html'; // Redirect to login page
}

// Display error messages
function showError(message, errorMessageElement, inputElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.classList.add('show');
    errorMessageElement.style.display = 'block'; // Make the error visible
    inputElement.classList.add('error');
    inputElement.focus();
}

// Clear previous error messages and styles
function clearErrors(username, password, errorMessage) {
    username.classList.remove('error');
    password.classList.remove('error');
    errorMessage.classList.remove('show');
    errorMessage.style.display = 'none'; // Hide the error message
}

// Attach event listeners for the login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    username.addEventListener('input', () => username.classList.remove('error'));
    password.addEventListener('input', () => password.classList.remove('error'));
}

// Attach event listener for the registration form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', handleRegistration);
}
