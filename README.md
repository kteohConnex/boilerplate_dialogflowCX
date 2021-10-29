# Starter Dialogflow CX Setup

This repo contains starter code for Dialogflow CX Webhooks with Cloud Functions.

## Configuration

1. Change current directory to ```/functions``` folder which is where all the code for the cloud function lies.

2. Install npm libraries

	    npm install

3. Install Firebase CLI globally using the following command (Only needed when deploying the Cloud Function)

		npm install -g firebase-tools

	 More instructions: https://firebase.google.com/docs/cli
    
4. Get Firebase service account credentions in JSON format and save it to ```/functions/credentials.json```. 

	  Credentials can be taken from either location:
	  
	  1. Firebase -> gear icon -> Project settings -> Service accounts -> Generate new private key
	  
	  2. GCP -> IAM & Admin -> Service Accounts -> select account -> Keys -> Add Key -> Create new key

## Running Cloud Function Locally
1. Run the following commands on seperate terminals:

   - Command to run the local application:

		    npm run dev
  
   - Command to start ngrok tunnel to port ```8080```:

		    npm run tunnel
    
2. Copy the https ngrok link from terminal to the Webhook URL entry under Webhook. Make sure to add ```/dialogflow/``` suffix to the https link.

   For example: 
    
		https://110c-2607-fea8-a6df-2500-89f5-6970-a5e1-79d6.ngrok.io/dialogflow/

## Deployment to GCP

After making all the changes to the code. Follow these instructions to deploy the cloud function to GCP:

1. Within the terminal, make sure your current directory is ```/functions```.

1. Login to GCP by entering following command:

	    firebase login

2. Switch to the GCP project you want deploy the function to:
	
	- NOTE: ```.firebaserc``` file contains list of project already added with their alias name.

	- To switch to the respective project:
	
			firebase use <project_alias_name> 
	
	- Use the following command to view available projects you have access to and add new project aliases:

			firebase use --add 

3.  Deploy the cloud function to GCP using following command:

		firebase deploy --only functions
		
		
4. Once successfully deployed, you will get the web hook URL in the terminal to trigger the cloud function (Can also be accessed from GCP Console). Use the link to add it to Dialgflow Fulfillment web socket section. Make sure to add ```/dialogflow/``` suffix to the URL.

	- For example:
	
			https://us-central1-[yourprojectid].cloudfunctions.net/app/dialogflow/

	- NOTE: The cloud function will needs a ```AllUser``` permission with ```Cloud Functions Invoker``` role to trigger it. This can be configured in GCP Cloud Function Console under ```Permissions```.
