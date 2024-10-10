const passwordInput = document.getElementById('passwordInput');
const strengthMessage = document.getElementById('strengthMessage');

// Funkcija za preverjanje moči gesla
passwordInput.addEventListener('input', function() {
    const password = passwordInput.value;
    let strength = '';

    if (password.length < 6) {
        strength = 'Weak';
        strengthMessage.className = 'strength weak';
    } else if (password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
        strength = 'Medium';
        strengthMessage.className = 'strength medium';
    } else if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[\W_]/.test(password)) {
        strength = 'Strong';
        strengthMessage.className = 'strength strong';
    } else {
        strength = 'Weak';
        strengthMessage.className = 'strength weak';
    }

    strengthMessage.textContent = `Password strength: ${strength}`;
});
