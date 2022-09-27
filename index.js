const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();

const port = process.env.PORT || 5000;

app.use("/v1", route);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  providerauth: { user: process.env.EMAIL },
  pass: process.env.PASSWORD,
});

route.post("/contact", (req, res) => {
  const { to, subject, text } = req.body;

  const mailData = {
    from: process.env.EMAIL,
    to: to || "test@email.com",
    subject: subject || "[no subject]",
    text: text || "[no email text]",
    // attachments: [
    //   {
    //     filename: "text notes.txt",
    //     path: "notes.txt",
    //   },
    // ],
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);

    res.status(200).send({ message: "Mail send", info });
  });
});
