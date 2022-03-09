import nodemailer from 'nodemailer';

const emailForgetPassword = async(data) => {
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
        subject: 'Reset your password',
        text: 'Reset your password',
        html: `<p>Hello:  ${name} ${lastname}, you have requested to reset your password.</p>
            <p>Follow the link below to generate a new password: <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reset password</a> </p>
            <p>If you didn't create this account, you can ignore this message</p>
        `,
    })

    console.log("Email send: %s", info.messageId);
}

export default emailForgetPassword;