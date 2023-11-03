const emailValidation = require('../emailValidation/emailValidator');
const passwordValidation = require('../passwordValidation/passwordValidator');

function handleRegistration(userEmail, userPassword) {
    if (!emailValidation.isEmailValid(userEmail)) {
        return { message: 'Invalid email address' };
    }

    if (emailValidation.isEmailInUse(userEmail)) {
        return { message: 'Email is already registered' };
    }

    if (!passwordValidation.isPasswordValid(userPassword)) {
        return { message: 'Invalid password' };
    }

    return null; // Registration is valid
}

module.exports = handleRegistration;
