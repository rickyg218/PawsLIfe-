"use strict";
  const nodemailer = require("nodemailer");
  
   async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
          user: 'napoleon.skiles@ethereal.email',
          pass: '1M71hd4c5vhP14FAWh'
      }
  });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'napoleon.skiles@ethereal.email', // sender address
      to: "napoleon.skiles@ethereal.email", // list of receivers
      subject: "Hello World", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
    
    console.log("Message sent: %s" + info.subject);

  }