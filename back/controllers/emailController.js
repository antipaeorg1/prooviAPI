const postmark = require('postmark');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

//unComment const client hardCoded API key if needed
//const client = new postmark.ServerClient("960bc81d-d202-4403-9226-d16e335154ec");
const client = new postmark.ServerClient(process.env.POSTMARK);
//console.log(process.env.POSTMARK);
const emailTemplate = path.join(__dirname, '../email/templates/emailTemplate.handlebars');


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

//sendEmail function with dynamic template used in registration and password recovery
const sendEmailTo = async (to, emailText) => {
    try {
        const templateSource = fs.readFileSync(emailTemplate, 'utf8');
        const template = handlebars.compile(templateSource);
        const emailData = {
            text: emailText
        };
        const email = template(emailData);
        await client.sendEmail({
            "From": "anti.paeorg@moduulo.com",
            "To": to,
            "Subject": "Hello from prooviAPI!",
            "HtmlBody": email,
            "MessageStream": "outbound"
        });


        // console.log('email sent!')
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }
};


module.exports = {
    sendEmail,
    sendEmailTo
};