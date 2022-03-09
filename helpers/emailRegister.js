import nodemailer from 'nodemailer';

const emailRegister = async(data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    const { email, name, lastname, token } = data;

    const info = await transporter.sendMail({
        from: 'NOVA-SHOP',
        to: email,
        subject: 'Check your NOVA account',
        text: 'Check your NOVA account',
        html: `<p>Hello: ${name} ${lastname}, check your NOVA account.</p>
            <p>Your account is ready, you only have to check it in the following link: <a href="${process.env.FRONTEND_URL}/confirm/${token}">Check account</a> </p>
            <p>If you didn't create this account, you can ignore this message</p>
        `,
    })

    console.log("Email send: %s", info.messageId);
}

export default emailRegister;