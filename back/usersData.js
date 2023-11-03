
// Array for storing User objects
// Used instead of Database (beware that dynamic data is lost when server restarts, hardcoded remains!!)

const usersData = [
    {
        firstName: "TestName",
        lastName: "TestName",
        userEmail: "test@moduulo.com",
        userPassword: "$2b$10$JNs8f02SCOmoBBr05bl3aeGP5ZA/ernFle4KQ.K8pdU1RFRsrrk8e",
        authenticated: false
    },
    {
        firstName: "TestName2",
        lastName: "TestName2",
        userEmail: "test2@moduulo.com",
        userPassword: "$2b$10$JNs8f02SCOmoBBr05bl3aeGP5ZA/ernFle4KQ.K8pdU1RFRsrrk8e",
        authenticated: true
    },
    {
        firstName: "Anti",
        lastName: "Paeorg",
        userEmail: "anti.paeorg@moduulo.com",
        userPassword: "$2b$10$JNs8f02SCOmoBBr05bl3aeGP5ZA/ernFle4KQ.K8pdU1RFRsrrk8e",
        authenticated: true
    }
];

module.exports = usersData;