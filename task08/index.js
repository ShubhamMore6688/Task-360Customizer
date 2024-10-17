var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateUserInput(input) {
    if (!emailRegex.test(input.email)) {
        throw new Error('Invalid email format');
    }
    return true;
}
var userInput = { email: 'shubhamdmore03@gmail.com', password: 'pass123' };
try {
    validateUserInput(userInput);
}
catch (error) {
    console.error(error.message);
}