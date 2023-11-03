import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import axios from "axios";

const AddUserModal = ({ isOpen, onClose }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [validationErrorColor, setValidationErrorColor] = useState('red');


    const handleSave = (e) => {
        e.preventDefault();
        // Simple validation to check if fields are not empty
        if (firstName && lastName && email && password) {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                userEmail: email,
                userPassword: password
            };

            let config = {
                method: 'POST',
                url: 'http://localhost:3000/register',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                data: userData
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setValidationErrorColor('green');
                    setValidationError(response.data.message);
                    setTimeout(() => {
                        onClose();
                        window.location.reload();
                    }, 3000);
                })
                .catch((error) => {
                    console.log(error);
                    setValidationErrorColor('red');
                    setValidationError(JSON.stringify(error.response.data.message));
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                });


        } else {
            setValidationError('All fields are required');
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <DialogTitle sx={{ textAlign: 'center' }}>Add New User</DialogTitle>
            <DialogContent>
                <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {validationError && (
                    <div style={{ color: validationErrorColor, marginTop: '0.5rem' }}>{validationError}</div>
                )}
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onClose} color="primary" variant="outlined" sx={{ color: 'black', borderColor: 'black', marginX: '1rem' }}>
                    Cancel
                </Button>
                <Button onClick={(e) => handleSave(e)} color="primary" variant="outlined" sx={{ color: 'black', borderColor: 'black', marginX: '1rem' }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserModal;
