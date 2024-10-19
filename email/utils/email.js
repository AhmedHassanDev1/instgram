
import {createTransport} from "nodemailer"
import {FROM_EMAIL,PASSWORD_EMAIL} from "../exports.js"
console.log(FROM_EMAIL,PASSWORD_EMAIL); 
let transporter=createTransport({
     service:"gmail",
    //  host:"smtp.gmail.com",
     port:465,
     secure:false,
    
     tls: {
      rejectUnauthorized: false, 
    },
     auth:{
        user:FROM_EMAIL,
        pass:PASSWORD_EMAIL,
     }
})

async function send_email(email,code){
let mailOptions={
    from:FROM_EMAIL,
    to:email,
    subject:"instagram verification code",
    text: `erification_code:${code}`
 }
 transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error:', error.message);
    } else {
      console.log('Email sent:', info.response);
    }})   
  

}

export default send_email
