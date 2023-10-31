const express = require('express');


const usersData = require('../usersData');
const handleRegistrationValidation = require('./registrationValidator/registrationValidator');
const handleLoginValidation = require('./loginValidator/loginValidator');
const emailController = require('../controllers/emailController');
const passwordUtil = require('../utils/passwordUtil')


const register = async (req, res) => {
    try {

        const registrationError = handleRegistrationValidation(req.body.userEmail, req.body.userPassword);

        if (registrationError) {
            res.status(400).json(registrationError);
            return;
        }

//TODO: send greeting to user via email and also validation link
        console.log('email and password are valid!');
        passwordUtil.hashPassword(req.body.userPassword,(error,userHashedPassword) => {
            if(error) {
                res.status(500).json({error: 'Password hashing failed'});
            } else {
                usersData.push({userEmail: req.body.userEmail, userPassword: userHashedPassword});
                console.log(usersData)
            }
        })

        await new emailController.sendEmailTo(req.body.userEmail);

        res.status(200).json({message: 'user registered!'});

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

        //TODO: jwt token sending must be implemented
        res.status(200).json({message: 'Login successful!'});
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};

const resetPassword = async (req, res) => {
    try {
        console.log(req.body);
        let userEmail = req.body.userEmail;
        let retrievedUser = usersData.find((user) => user.userEmail === userEmail)
        if (retrievedUser) {
            retrievedUser.userPassword = 'newPasswordAssigned';
            console.log(usersData);
            res.status(200).json({message: 'Password reset successfully!'})
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