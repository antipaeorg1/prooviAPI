const jwt = require('jsonwebtoken');

const usersData = require('../usersData');
const handleRegistrationValidation = require('./registrationValidator/registrationValidator');
const handleLoginValidation = require('./loginValidator/loginValidator');
const emailController = require('../controllers/emailController');
const passwordUtil = require('../utils/passwordUtil');


const register = async (req, res) => {
    try {
        // Registration validation returns an error, (can be password or email related)
        const registrationError = await handleRegistrationValidation(req.body.userEmail, req.body.userPassword);

        // If error occurs it will be passed to frontend and code execution ends
        if (registrationError) {
            res.status(400).json(registrationError);
            return;
        }

//TODO: validation link, currently email is sent only and authenticated = true
        console.log('email and password are valid!');
        //Hashing the password
        passwordUtil.hashPassword(req.body.userPassword, (error, userHashedPassword) => {
            if (error) {
                res.status(500).json({message: 'Password hashing failed'});
            } else {
                //Store data into usersData array
                usersData.push({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    userEmail: req.body.userEmail,
                    userPassword: userHashedPassword,
                    authenticated: true
                });
                console.log(usersData);
            }
        });

        //Sending email template to registered userEmail
        await emailController.sendEmailTo(req.body.userEmail, 'You have been successfully registered!').then(() => {
            res.status(200).json({message: 'Registration successful!'});
        })
            .catch((error) => {
                res.status(500).json({error: 'Email sending failed', emailError: error});
            });


    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        let userEmail = req.body.userEmail;
        let userPassword = req.body.userPassword;


        const loginError = handleLoginValidation(userEmail, userPassword);

        if (loginError) {
            res.status(400).json(loginError);
            return;
        }

        // Find specific user from array and check if he has been authenticated, if not JWT token is not sent
        const user = usersData.find((user) => user.userEmail === userEmail);
        if (user.authenticated === false) {
            return res.status(401).json({message: 'User has not been authenticated!'});
        }

        // create JWT accessToken and send it to client
        const accessToken = jwt.sign(user, process.env.JWT_ACCESS_TOKEN);
        res.status(200).json({accessToken: accessToken});

    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};

const resetPassword = async (req, res) => {
    try {
        console.log(req.body);
        let userEmail = req.body.userEmail;

        //Search for a specific user from usersData array, and assign hardcoded password which will be also changed and updated
        // in array. Password is also sent to the user email.
        let retrievedUser = usersData.find((user) => user.userEmail === userEmail)
        if (retrievedUser) {

            let newPassword = 'abcdefghij123'
            passwordUtil.hashPassword(newPassword, (error, userNewHashedPassword) => {
                if (error) {
                    res.status(500).json({message: 'Password hashing failed'});
                } else {
                    retrievedUser.userPassword = userNewHashedPassword;
                    console.log(usersData);

                    emailController.sendEmailTo(userEmail, `Your new password is ${newPassword} `);
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json({message: 'Password reset successfully!'});
                }
            });

        } else {
            res.status(400).json({message: 'Email does not exist!'})
        }

    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }
}


module.exports = {
    register,
    login,
    resetPassword
};