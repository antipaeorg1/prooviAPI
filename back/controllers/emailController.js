const express = require('express');
const postmark = require('postmark');

const client = new postmark.ServerClient("960bc81d-d202-4403-9226-d16e335154ec")

// const client = new postmark.ServerClient(process.env.POSTMARK);
console.log(process.env.POSTMARK);

const sendEmail = async (req, res) => {
    try {
        console.log(req.body);


        await client.sendEmail({
            "From": "anti.paeorg@moduulo.com",
            "To": "anti.paeorg@moduulo.com",
            "Subject": "Hello from Postmark",
            "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
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
            "Subject": "Hello from Postmark",
            "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
            "TextBody": "Hello from Postmark!",
            "MessageStream": "outbound"
        });


        res.status(200).json({message: 'email sent!'});
    } catch (error) {

        console.error(error);
        res.status(500).json({message: 'BAD IMPLEMENTATION'});
    }

};


module.exports = {
    sendEmail,
    sendEmailTo
};