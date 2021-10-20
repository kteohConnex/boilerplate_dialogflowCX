const express = require('express')
const admin = require('firebase-admin')
const fs = require('fs')
const app = express()
const path = './credentials.json';

// Firebase Setup
if(fs.existsSync(path)){
  var serviceAccount = require(path);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  admin.initializeApp();
}

const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

// Routes
app.get('/', (req, res) => res.send('online'))
app.post("/dialogflow", express.json(), (req, res) => {

  console.log('Dialogflow Request body: ' + JSON.stringify(req.body));

  let tag = req.body.fulfillmentInfo.tag;
  
  console.log('Tag: ', tag);
  console.log('Session Info Parameters: ' + JSON.stringify(req.body.sessionInfo.parameters));


  let jsonResponse = {};
  if (tag == "welcome") {
    const reservationDetails = db.collection('reservations').doc('12345');
    console.log({reservationDetails})
    //fulfillment response to be sent to the agent if the request tag is equal to "welcome tag"
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              //fulfillment text response to be sent to the agent
              text: ["Hi! This is a webhook response"]
            }
          }
        ]
      }
    };
  } else {
    jsonResponse = {
      //fulfillment text response to be sent to the agent if there are no defined responses for the specified tag
      fulfillment_response: {
        messages: [
          {
            text: {
              ////fulfillment text response to be sent to the agent
              text: [
                `There are no fulfillment responses defined for "${tag}"" tag`
              ]
            }
          }
        ]
      }
    };
  }
  res.json(jsonResponse);
});

module.exports = app