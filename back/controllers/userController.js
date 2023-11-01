const usersData = require("../usersData");

const getUserList = (req, res) => {
    try {
        const users = usersData;
        res.status(200).json({users});

    } catch (error) {

        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};

const deleteUser = (req, res) => {
    try {
        const userEmail = req.params.id;
        const userIndex = usersData.findIndex(user => user.userEmail === userEmail);
        if (userIndex !== -1) {
            usersData.splice(userIndex, 1);
            console.log(usersData);
            return res.status(200).send('User deleted successfully.');
        } else {
            return res.status(404).send('User not found.');
        }

    } catch (error) {

        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};


module.exports = {getUserList, deleteUser}
