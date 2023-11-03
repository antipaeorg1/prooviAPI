const bcrypt = require('bcrypt');

// function to hash password before saving it into the Database(actually array usersData.js)
const hashPassword = (userPassword, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            // Pass the error to the callback
            callback(err);
        } else {
            bcrypt.hash(userPassword, salt, (err, hashedPassword) => {
                if (err) {
                    // Pass the error to the callback
                    callback(err);
                } else {
                    // Pass the hashed password to the callback
                    callback(null, hashedPassword);
                }
            });
        }
    });
};


module.exports = {
    hashPassword,
};
