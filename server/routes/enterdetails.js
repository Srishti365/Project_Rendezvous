var bodyParser = require('body-parser');
const router = require('express').Router();
const models = require('../models/entry');
const nodemailer = require('nodemailer');
const accountSid = 'ACxxxxxxx';
const authToken = 'Yor Auth token here';

const client = require('twilio')(accountSid, authToken)

Host = models.host;
Visitor = models.visitor;
Entry = models.entry;

//-------------------Enter credentials for email and SMS-------------------
var email_id = 'Enter your email id';
var password = 'Enter your password';
var twilio_no = 'Enter your twilio number';
//--------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: { 
        user: email_id,
        pass: password
    }
  });

//-----------------------calculating IST time---------------------
function getTime(){
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30 
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
    var hoursIST = ISTTime.getHours();
    var ampm = hoursIST >= 12 ? 'PM' : 'AM';
    hoursIST = hoursIST % 12;
    hoursIST = hoursIST ? hoursIST : 12;
    var minutesIST = ISTTime.getMinutes();
    minutesIST = minutesIST < 10 ? '0'+minutesIST : minutesIST;
    var time = hoursIST + ":" + minutesIST + " "+ ampm;
    return time;
}
//-------------------------------------------------------------------


router.get('/', (req, res, next) => {
    console.log("entered main page");
    res.json("entry form here");

});

//-------------------posting entry details---------------------------
router.post('/', async (req, res, next) => {
    try{
            const {name, email, phone, hostname, hostemail, hostphone} = req.body;

            var newhost= new Host({
                name : hostname,
                email: hostemail,
                phone: hostphone
            });

            await newhost.save();

            var newvisitor= new Visitor({ name, email, phone });

            await newvisitor.save();

            var newentry = new Entry({
                host : newhost,
                visitor: newvisitor,
                checkin: getTime()
            })

            await newentry.save();

            //---------send mail to the host---------------------
        const html = `Hi, ${hostname},

You have an appointment from a vistor:
The details are:
Name : ${name}
Email id : ${email} 
Contact no. : ${phone}
Check In Time : ${newentry.checkin} IST

Have a pleasant day!
Regards.`;
        

        const mailOptions = {
            from: email_id,
            to: hostemail,
            subject: 'A Visitor has arrived',
            text: html
        };

        await transporter.sendMail(mailOptions, function(error, info){
            if(error) {
            console.log(error);
            } else {
            console.log('Email sent' + info.response);
            }
            
        });

        var host_contact = hostphone;
        host_contact = '+91'+host_contact;

        client.messages.create({
            to:host_contact,
            from: twilio_no,
            body: html
        }).then((message) => (console.log(message.sid)));


        //-----------------------------------
           
        res.json({entry: newentry.id});
}
catch(error){
    next(error);
  }
});
//-------------------------------------------

//--------------check out-----------------------
router.post('/checkout', async (req, res, next) => {
    try{
            console.log("checking out");

            id = req.body.id;

            await Entry.findById(id).then(async function(entry1){
                entry1.checkout = getTime();
                entry1.save();

                 //---------send mail to visitor---------------------
        const html = `Hi, ${entry1.visitor.name},
You have checked out successfully.

The details of your visit :

Name : ${entry1.visitor.name}
Contact : ${entry1.visitor.phone}
Email : ${entry1.visitor.email}
Check in time : ${entry1.checkin} IST
Check out time : ${entry1.checkout} IST
Host's name : ${entry1.host.name}
address: http://localhost:3000/dashboard

 Have a pleasant day!
 Regards.`;

        const mailOptions = {
            from: email_id,
            to: entry1.visitor.email,
            subject: 'Thank You for visiting',
            text: html
        };

        await transporter.sendMail(mailOptions, function(error, info){
            if(error) {
            console.log(error);
            } else {
            console.log('Email sent' + info.response);
            }
            
        });

        //-----------------------------------
            });
            

            res.json("checked out");
}
//--------------------------------------------
catch(error){
    next(error);
  }
});



module.exports = router;