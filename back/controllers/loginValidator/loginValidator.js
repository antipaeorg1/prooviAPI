const bcrypt = require('bcrypt');
const usersData = require('../../usersData');


function handleLogin(userEmail, userPassword) {
    const user = usersData.find((user) => user.userEmail === userEmail);

    if (!user) {
        return {message: 'Email not found. Please check your email address or register a new account.'};
    }

    // Compare the provided password with the hashed password from the database
    if (!bcrypt.compareSync(userPassword, user.userPassword)) {
        return {message: 'Incorrect password. Please check your password or reset your password if necessary.'};
    }


    return null; // You can return the user data or a success message here
}

module.exports = handleLogin;