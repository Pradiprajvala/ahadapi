require('dotenv').config({path: "../.env"});
const express = require('express');
const app = express()
const doctors = require('./data')
const serverless = require('serverless-http')
const router = express.Router();
const { Twilio } = require('twilio')
const twilio = require('twilio')


const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}


    

router.get('/sendMessage', (req,res) => {
    

    const accountSid = process.env.SID;
const authToken = process.env.AUTH;

    const client = new twilio(accountSid,authToken);
    const { to,name,hospital,specialist,time,address } = req.query    
    
  const hospitalUri = decodeURIComponent(hospital)
  const timeUri = decodeURIComponent(time)
  const specialistUri = decodeURIComponent(specialist)
  const addressUri = decodeURIComponent(address)
  const phoneUri = decodeURIComponent(to)
  const nameUri = decodeURIComponent(name)
    client.messages
    .create({
        body: `Hello ${nameUri}, Your Appointment is fixed at ${hospitalUri} for ${specialistUri}.\nTimings are ${timeUri}.\nHospital Adrress: ${addressUri}`,
        to: `+${phoneUri}`,
        from: '+16184149176',
    })
    .then((message) =>{
        return res.json(message)
    }
     )
    .catch((err) =>{
        return res.json(err)
    } )
    

})







router.get('/doctors', (req,res) => {
    const {catagory} = req.query
    const {timeFrom, timeTo} = req.query
    sortedDoctors = [...doctors]
    if(catagory){
        sortedDoctors = doctors.filter(doctor => doctor.catagory === catagory)  
    } 
    res.json(sortedDoctors);
})




app.use('/.netlify/functions/api', router)
// app.listen(3000, () => {
//     console.log('Listening On Port 3000');
// })
module.exports.handler = serverless(app) 
