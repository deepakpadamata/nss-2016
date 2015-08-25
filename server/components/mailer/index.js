var nodemailer = require('nodemailer');


'use strict';
module.exports = function sendEmail(sub, text, emailTo ) {
	var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: email,
          pass: password
        }
    });

	var mailOptions = {
    	from: email,
    	to: emailTo,
    	subject: sub,
    	text: text,
	};

    transporter.sendMail(mailOptions, function (err, info) {
    	if(error){
        	return console.log(error);
    	}
    	console.log('Message sent: ' + info.response);
    });   
};
