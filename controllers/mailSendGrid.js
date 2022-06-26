var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');

var options = {
  auth: {
    api_key: process.env.SEND_GRID_API_KEY,
  },
};
var mailer = nodemailer.createTransport(sgTransport(options));

const sendEmailGrid = (name, to, title, message, work) => {
  var email = {
    from: process.env.SEND_GRID_MAIL,
    to: to,
    subject: `Hi ${name} ,  Reminder Notification`,
    html: `
                          <div style="max-width: 700px;background-color:ghostwhite;box-shadow:0px 2px 15px black; margin:auto; border: 5px solid #ddd; padding: 50px 20px; font-size: 110%;">
                          <h2 style=" text-transform: capitalize;color: teal;">Hi ${name} </h2>
                          <p> Title ${title}
                          </p>
                          <p> Message ${message}</p>
                          
                          
                      
                          
                          </div>
                      `,
  };

  mailer.sendMail(email, function (err, res) {
    if (err) {
      console.log(err);
    }
    console.log(res);
  });
};

module.exports = sendEmailGrid;
