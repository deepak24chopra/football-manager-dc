const nodemailer = require('nodemailer');

async function mail(userEmail) {

    let transport = nodemailer.createTransport({
        host: "", //smtp host here
        port: 8080,
        secure: false,
        auth: {
            user: "deepak2424chopra@gmail.com",
            pass: "randompassword"
        }
    });

    let info = await transport.sendMail({
        from: "deepak2424chopra@gmail.com",
        to: userEmail, // here user's email address
        subject: "Verify Account",
        text: "Please verify your account."
    });

    console.log("Message sent: %s", info.messageId);
}