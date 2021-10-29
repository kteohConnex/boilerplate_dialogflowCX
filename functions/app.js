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
  // console.log('Session Info Parameters: ' + JSON.stringify(req.body.sessionInfo.parameters));

  function welcomeMessage(req, res) {
    let jsonResponse = {};
    jsonResponse = {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: ["Hi! This is a webhook response"]
            }
          }
        ]
      }
    };
    res.json(jsonResponse);
  }
  
  async function check_database(req, res, db) {
    let jsonResponse = {}
    const botParametersDoc = await db.collection('botParameters').doc('companyDetails').get();
    jsonResponse.sessionInfo = {
      parameters: {
        'companyName': botParametersDoc.data().companyName
      }
    }
    res.json(jsonResponse);
  }
  
  switch(tag) {
  case "welcome":
    welcomeMessage(req, res)
    break;
  case "check_database":
    check_database(req, res, db);
    break;
  default:
    return res.status(404).send({ error: 'No Tag' });
  }
   
});

module.exports = app