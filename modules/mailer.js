const nodemailer = require('nodemailer');

async function mail(userEmail) {

    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "deepak2424chopra@gmail.com",
            pass: "Deepak*24"
        }
    });

    let info = await transport.sendMail({
        from: "deepak2424chopra@gmail.com",
        to: userEmail, // here user's email address
        subject: "Verify Account",
        text: "Please verify your account."
    }, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });

    console.log("Message sent: %s", info.messageId);
}

module.exports = {
    mail
}