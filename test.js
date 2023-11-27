const { sendMail } = require("./sendmail");
const args = process.argv.slice(2);

if (!args[0]) {
  console.log("Please provide an email address to send to.");
  process.exit(0);
}

const rawEmail = {
  to: { text: args[0] },
  subject: "Test from Custom SMTP Relay",
  text: "Hi there -- This message was relayed through AWS SES via your Node Custom SMTP Server.",
};

// Call the function with the raw email object
const infoPromise = sendMail(rawEmail);
infoPromise
  .then((info) => {
    console.log("Email sent.");
  })
  .catch(console.error);
