const emailValidation = require('../emailValidation/emailValidator');
const passwordValidation = require('../passwordValidation/passwordValidator');

function handleRegistration(userEmail, userPassword) {
    if (!emailValidation.isEmailValid(userEmail)) {
        return { error: 'Invalid email address' };
    }

    if (emailValidation.isEmailInUse(userEmail)) {
        return { error: 'Email is already registered' };
    }

    if (!passwordValidation.isPasswordValid(userPassword)) {
        return { error: 'Invalid password' };
    }

    return null; // Registration is valid
}

module.exports = handleRegistration;
