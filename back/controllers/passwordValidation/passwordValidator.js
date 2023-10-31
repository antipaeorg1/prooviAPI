const usersData = require("../../usersData");

function isPasswordRegistered(userPassword) {
    for (let user of usersData) {
        if (user.userPassword === userPassword) {
            return true;
        }
    }
    return false;
}
function isPasswordValid(userPassword) {
    return userPassword.length >= 8
}

module.exports = {isPasswordValid, isPasswordRegistered};