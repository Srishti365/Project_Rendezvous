# Project_Rendezvous

## Description:
An entry management application that captures the details of the visitor and the host and notifies them through email and sms during check in and check out.

## How to run this code:

1. Make sure MongoDB is running on your system.
   Install mongodb.
   Then start mongodb using the command `sudo service mongod start`.  
2. Clone this repository
3. Open command line in the cloned folder,
4. To install dependencies for NodeJs, navigate to server folder and run the command `sudo npm install`
5. To install dependencies for React, navigate to client folder and run the command `sudo npm install`
6. To send the sms, you will need to have an account on twilio. You can either buy a number or use the trial number.
   If using the trial number, the numbers to which messages have to be sent will have to be entered in the list of verified      numbers on the twilio website. https://www.twilio.com/console/phone-numbers/verified
7. Navigate to server/routes/enterdetails.js. Here enter the Account Sid, Auth Token and the number from which you want to send the messages from your twilio account. Also enter your email id and password for the account through which the email has to be sent.
8. To start the server, navigate to server folder and run the command `sudo nodemon app.js`
9. To run the application, open another terminal, navigate to client folder and run the command `sudo npm start`
10. Open `http://localhost:3000` in the browser

## Approach

Front-End - React + Redux

Back-End - Node.js, Express.js & MongoDB

In the website, the visitor enters the required details in the form after which they are stored in the database.

This triggers an email and SMS to the host.

Once the visitor checks out, the details of his visit are sent via email.
