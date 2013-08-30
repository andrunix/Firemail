var nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var Firebase = require('firebase');
var myRoot = new Firebase('https://maillist.firebaseio.com');

// add in bodyParser middleware to handle parsing POST requests
app.use(express.bodyParser());

// create reusable transport method
var smtpTransport = nodemailer.createTransport('SMTP', {
    service: "Gmail",
    auth: {
        user: "user@example.com",
        pass: "*************"
    }
});

var mailOptions = {
    from: "Andrew Pierce <andrunix@gmail.com>",
    to: "info@example.com",
}

app.get('/', function(req, res) {
    res.sendfile('index.html');
});


app.post('/contact', function(req, res) {

    // add this subscriber to firebase
    subref = myRoot.child('subscribers');
    childref = subref.push();
    childref.set({ name: req.body.your_name, email: req.body.your_email});

    // now send us an email notification of the new subscriber
    mailOptions.html = "<b>" + req.body.your_name + "</b><p>" + req.body.your_message + "</p>";
    mailOptions.subject = "New message from " + req.body.your_name;
    smtpTransport.sendMail(mailOptions, function(error, response) {
        if(error) {
            console.log(error);
        }
        else {
            console.log("Message sent: " + response.message);
        }
        smtpTransport.close();
    });
    res.sendfile('contact.html');
});

app.listen(3000);
console.log('Listening on port 3000');

