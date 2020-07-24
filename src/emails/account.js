const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_ENV_KEY)

const sendWelcomeEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'marc@marcvirtual.com',
        subject:'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}
const sendCancelationEmail = (email,name) => {
    sgMail.send({
        to:email,
        from:'marc@marcvirtual.com',
        subject:'Cancelation Email!',
        text: `We're sad to see you go, ${name}. Let me know why you cancelled your account.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}