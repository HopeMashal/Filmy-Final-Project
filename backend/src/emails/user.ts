const sgMail = require ("@sendgrid/mail")
const sendGridAPIKey = process.env.SGAPIKEY

sgMail.setApiKey(sendGridAPIKey)

export const sendResetPasswordEmail = (user,token) => {
    try {
      const data = {
        from: process.env.GOOGLE_USER,
        to: user.email,
        subject: 'Filmy - Reset Password',
        html: `
          <h3>Hello ${user.name} </h3>
          <p>To reset your password please follow this link: <a target="_" href="${process.env.DOMAIN}/rest/${token}">Reset Password Link</a></p>
          <p>Thanks,</p>
          <p>Filmy Team</p>
        `
      };
      sgMail.send(data);
    } catch (e:any) {
      return new Error(e);
    }
  };
  