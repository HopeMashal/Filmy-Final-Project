  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const nodemailer = require('nodemailer');

  function sendEmail(message) {
    return new Promise((res, rej) => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GOOGLE_USER,
          pass: process.env.GOOGLE_PASSWORD
        }
      })
  
      transporter.sendMail(message, function(err, info) {
        if (err) {
          rej(err)
        } else {
          res(info)
        }
      })
    })
  }
  
  export const sendResetPasswordEmail = (user,token) => {
    const message = {
      from: `"Filmy Team" <${process.env.GOOGLE_USER}>`,
      to: user.email,
      subject: 'Filmy - Reset Password',
      html: `
        <h3>Hello ${user.name} </h3>
        <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/rest/${token}">Reset Password Link</a></p>
        <p>Thanks,</p>
        <p>Filmy Team</p>
      `
    };
  
    return sendEmail(message);
  }