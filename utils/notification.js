const nodemailer = require('nodemailer');
const axios = require('axios');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
};

const sendSms = async (to, body) => {
  const response = await axios.post(
    'https://api.infobip.com/sms/2/text/advanced',
    {
      messages: [
        {
          destinations: [
            {
              to: to
            }
          ],
          from: process.env.INFOBIP_SENDER_ID,
          text: body
        }
      ]
    },
    {
      headers: {
        'Authorization': `App ${process.env.INFOBIP_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  return response.data;
};

module.exports = {
  sendEmail,
  sendSms
};
