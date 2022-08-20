const express = require('express')
const app = express()
const doctors = require('./data')
const serverless = require('serverless-http')
const router = express.Router();
const { Twilio } = require('twilio')
const twilio = require('twilio')




    

router.get('/sendMessage', (req,res) => {
    

    const accountSid = 'AC01bde57a30f3f4fb75bab4ec7d14c5ba'
    const authToken = '328d9eb0659e79b7287b4db7239a1eee'

    const client = new twilio(accountSid,authToken);
    const { to } = req.query    
    
    client.messages
    .create({
        body: 'Hello Your Appointment is fixed',
        to: `+${to}`,
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
