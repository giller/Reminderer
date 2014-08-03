Get started with Reminderer
-----------------------------------

Welcome to Node JS Web Starter application that uses the IBM DataCache REST interface!

This sample application demonstrates how to write a Node JS application using the IBM DataCache REST interface and deploy it on Bluemix.

1. [Install the cf command-line tool](https://www.ng.bluemix.net/docs/#starters/BuildingWeb.html#install_cf).
2. [Download the starter application package](https://ace.ng.bluemix.net:443/rest/../rest/apps/1c935591-ffd3-4903-a8e6-e60bb3d06f54/starter-download).
3. Extract the package and `cd` to it.
4. Connect to Bluemix:

		cf api https://api.ng.bluemix.net

5. Log into Bluemix:

		cf login -u gillercentral@gmail.com
		cf target -o gillercentral@gmail.com -s dev
		
6. Deploy your app:

		cf push Reminderer

7. Access your app: [http://Reminderer.mybluemix.net](http://Reminderer.mybluemix.net)
