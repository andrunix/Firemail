FireMail
=======

Firemail is a very simple Node.js application that 
demonstrates using NodeMailer and Firebase.

We have a form on the index.html page that will capture
Name, Email, and a Message. There is no client side scripting
or validation. Hey, this is for demo purposes only. 

On submit, the Node.js application parses the parameters 
from the request object, inserts the user and email into Firebase
and then sends an email to designated email address.

In order for this to work for you, you must create a
Firebase account and a new Firebase named 'maillist'.

In order for the Nodemailer portion to work, you need to
change the code in app.js 

    // create reusable transport method
    var smtpTransport = nodemailer.createTransport('SMTP', {
        service: "Gmail",
            auth: {
                user: "user@example.com",
                pass: "*************"
            }
    });


In my example, I am using Gmail as the SMTP service. No special
configuration is required other than a valid user and password.


