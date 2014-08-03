/* jshint node:true */

/*
 * Cache related operation
 */
var WXS = require('../wxs');
// USE FOR CLOUDFOUNDRY DEPLOYMENT
var env = JSON.parse(process.env.VCAP_SERVICES);
var wxsprops = getEnv(env);

var wxsclient = new WXS(wxsprops);

exports.getCache = function(req, res) {
	var key = req.params.key;
	console.log("get key:" + key);
	wxsclient.get(key, function(wxsres) {
		res.json({
			value : wxsres
		});
	});
};

exports.putCache = function(req, res) {
	var key = req.query.key;
	var value = req.query.value;
	wxsclient.put(key, value, function() {
		res.json({
			value : "Put successfully."
		});
	});
};

exports.removeCache = function(req, res) {
	var key = req.params.key;
	wxsclient.remove(key, function() {
		res.json({
			value : "Remove successfully."
		});
		console.log('finished remove');
	});
};
var mongo = "mongodb://IbmCloud_i38egc65_l8bknp0p_48dl3kfr:x3scdpf9_2-LJ1AdhYhOCJ9HM82uMFeU@ds027708.mongolab.com:27708/IbmCloud_i38egc65_l8bknp0p";

exports.ayySetup = function(req, res) {

	var mongodb = require('mongodb');
	var mongoclient = mongodb.MongoClient;
	var env = JSON.parse(process.env.VCAP_SERVICES);
	mongoclient.connect(env.mongolab[0].credentials.uri, function(err, db) {
		if(err) res.send("error");
		
			
		db.collection("test", function(err, collection) {
			if(err) res.send("error 2");

			if(collection.find()){
				var result = collection.find( { age: 20 });
				res.send(result);
			}
			else{
				res.send("error 3");
			}
		});

		/*var result = db.collection("test");
		res.send(result);*/


	});
	//var vcapServices = jSON.parse(process.env.VCAP_SERVICES);
		/*var mongoclient = require('mongodb').MongoClient;
		mongoclient.connect(mongo, function(err, conn) {
		var collection = conn.collection();
		var val = collection[0].name;
		res.json({
			value: val
		});
	});*/
};
/*exports.ayySetup = function(req, res) {
	var returnvalue;
	wxsclient.get("ayy", function(wxsres) {
		res.json({
			value: wxsres
		});

		returnvalue = wxsres;
	});

	if(!returnvalue){
		wxsclient.put("ayy","lmao", function() {
			res.json({
				meta: "ayy added to cache successfully",
				value: "lmao"
			});
			
	});
	}
};

/**
 * Need to ignore the version number of DataCache when getting the credentials.
 */
function getEnv(vcapEnv) {
   for (var serviceOfferingName in vcapEnv) {
   	    if (vcapEnv.hasOwnProperty(serviceOfferingName) &&
   	    		serviceOfferingName.indexOf("DataCache-") === 0) {
   	    	var serviceBindingData = vcapEnv[serviceOfferingName][0];
   	    	return serviceBindingData.credentials;
   	    }
   }
}

