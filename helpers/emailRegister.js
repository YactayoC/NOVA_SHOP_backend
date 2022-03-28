import nodemailer from "nodemailer";

const emailRegister = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // smtp.mailtrap.io
    port: process.env.EMAIL_PORT, //2525
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, //6669339c04080e
      pass: process.env.EMAIL_PASS, //a803b137d6d723
    },
  });

  const { email, name, lastname, token } = data;

  const info = await transporter.sendMail({
    from: "NOVA",
    to: email,
    subject: "Check your NOVA account",
    text: "Check your NOVA account",
    html: `<p>Hello: ${name} ${lastname}, check your NOVA account.</p>
            <p>Your account is ready, you only have to check it in the following link: <a href="${process.env.FRONTEND_URL}/public/user/confirm.html?/${token}">Check account</a> </p>
            <p>If you didn't create this account, you can ignore this message</p>
        `,
  });

  console.log("Email send: %s", info.messageId);
};

export default emailRegister;
