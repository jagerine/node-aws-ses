const Env = require("dotenv").config().parsed || {};
const SMTPServer = require("smtp-server").SMTPServer;
const SimpleParser = require("mailparser").simpleParser;
const { sendMail } = require("./sendmail");

const server = new SMTPServer({
  banner: Env.SMTP_BANNER || 'NodeJS Custom SMTP Server',
  secure: false,
  authOptional: true,
  disableReverseLookup: true,

  onData(stream, session, callback) {
    SimpleParser(stream, {}, (err, parsed) => {
      if (err) console.log("Error:", err);

      sendMail(parsed);
      stream.on("end", callback);
    });

    stream.pipe(process.stdout);
    stream.on("end", () => {
      callback(null, "Message queued");
    });
  },
});

server.on("error", (err) => {
  console.log({ err });
});

server.listen(25);
console.log("SMTP Server listening on port", 25);