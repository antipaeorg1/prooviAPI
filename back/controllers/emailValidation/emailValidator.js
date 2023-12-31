const usersData = require('../../usersData')

//Email syntax validation
function isEmailValid(userEmail) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(userEmail)
}

//Checking if email is already registered
function isEmailInUse(userEmail) {
    for (let user of usersData) {
        if (user.userEmail === userEmail) {
            return true;
        }
    }
    return false;
}

module.exports = {isEmailValid,isEmailInUse}

