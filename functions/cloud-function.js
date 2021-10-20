const functions = require("firebase-functions");
const teemingVR_DF_CX = require("./app");

exports.teemingVR_DF_CX = functions.region('us-east1').https.onRequest(teemingVR_DF_CX);