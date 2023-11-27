const Env = require("dotenv").config().parsed || {};
const nodemailer = require("nodemailer");

async function sendMail(mail) {
  const to = mail.to.text || null;
  if (!to) {
    console.log("No to address provided");
    return;
  }

  const subject = mail.subject ?? "(No subject)";
  const text = mail.text ?? "";
  const html = mail.html ?? mail.textAsHtml ?? "";

  const smtpEndpoint = Env.AWS_SES_ENDPOINT;
  const port = Env.AWS_PORT;
  const senderAddress = Env.AWS_SENDER_EMAIL;
  const smtpUsername = Env.AWS_ACCESS_KEY;
  const smtpPassword = Env.AWS_SECRET_KEY;

  var toAddresses = to;
  var bodyHtml = html;
  var bodyText = text;

  let main = async () => {
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: false,
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    let mailOptions = {
      from: senderAddress,
      to: toAddresses,
      subject: subject,
      text: bodyText,
      html: bodyHtml,
    };

    let info = await transporter.sendMail(mailOptions);
    return info;
  };

  main().catch(console.error);
}

module.exports = { sendMail };
