const postmark = require('postmark');
const fs = require('fs');
const template = fs.readFileSync('/Users/antipaeorg/WebstormProjects/prooviAPI/back/email/templates/confirmation-template.html','utf8')

//const client = new postmark.ServerClient("960bc81d-d202-4403-9226-d16e335154ec");

const client = new postmark.ServerClient(process.env.POSTMARK);
//console.log(process.env.POSTMARK);
const sendEmail = async (req, res) => {
    try {
        console.log(req.body);


        await client.sendEmail({
            "From": "anti.paeorg@moduulo.com",
            "To": "antipaeorg1@hotmail.com",
            "Subject": "Hello from Postmark",
            "HtmlBody": template,
            "TextBody": "Hello from Postmark!",
            "MessageStream": "outbound"
        });


        res.status(200).json({message: 'email sent!'});
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};

const sendEmailTo = async (to) => {
    try {
        await client.sendEmail({
            "From": "anti.paeorg@moduulo.com",
            "To": to,
            "Subject": "Hello from prooviAPI",
            "HtmlBody": "<strong>Hello</strong> hinnaline prooviAPI kasutaja",
            "TextBody": "Tere olete registreerunud mu prooviäppi! :) ",
            "MessageStream": "outbound"
        });


        console.log('email sent!')
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }
};
const validateAccount = async (req, res) => {
    const userdata = req.body;
    console.log(userdata)
    res.json({ message: 'Form submitted successfully' });
};


module.exports = {
    sendEmail,
    sendEmailTo,
    validateAccount
};