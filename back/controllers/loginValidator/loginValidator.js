const emailValidation = require('../emailValidation/emailValidator');
const passwordValidation = require('../passwordValidation/passwordValidator');


function handleLogin(userEmail, userPassword) {

    if (!emailValidation.isEmailInUse(userEmail)) {
        return {error: 'Email not found. Please check your email address or register a new account.'};
    }
    if (!passwordValidation.isPasswordRegistered(userPassword)) {
        return {error: 'Incorrect password. Please check your password or reset your password if necessary.'};
    }
    return null;

}

module.exports = handleLogin;