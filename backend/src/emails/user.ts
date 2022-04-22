const sgMail = require ("@sendgrid/mail")
const sendGridAPIKey = process.env.SGAPIKEY

sgMail.setApiKey(sendGridAPIKey)

export const sendEmail = (receiver, source, subject, content) => {
    try {
      const data = {
        to: receiver,
        from: source,
        subject,
        html: content,
      };
      sgMail.send(data);
    } catch (e:any) {
      return new Error(e);
    }
  };
  
