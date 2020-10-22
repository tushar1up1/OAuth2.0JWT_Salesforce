#!/usr/bin/env node

var Promise = require('bluebird');
var readFile = Promise.promisify(require('fs').readFile);
var path = require('path');
var _ = require('lodash');
var request = require('request');
var base64url = require('base64-url');
var njwt = require('njwt');
var { resolve, reject } = require('bluebird');


var CLIENT_SECRET_SALESFORCE_CONNECTED_APP = "<Client secret from salesforce portal>";
var SALESFORCE_USERNAME = "<Your slaesforce email/ username having an access to the registered app>";
var SALESFORCE_INTERNALUSER_REPORT_URL = "<Salesforce report url>";


function createJWTSignedToken_NJWT_Lib(){
    var payload = {
        'iss': CLIENT_SECRET_SALESFORCE_CONNECTED_APP, //when you register app on salesforce, you get this value
        'sub': SALESFORCE_USERNAME,
        'aud':'https://login.salesforce.com',
        'exp': (Math.floor(Date.now()/1000) + 1800)
    };
    return new Promise(function (resolve, reject){
        encryptToken_RS256_Signed_Privatekey(payload)
            .then(function (token) {
                resolve(token);
            })

    })
}

function encryptToken_RS256_Signed_Privatekey(payload) {
    var privatekeypath = path.join(__dirname, './privatekey.pem'); // you need to generate private key, x509 certificate pair using openssl
    return new Promise(function (resolve, reject){
        readFile(privatekeypath)
            .then(function (privatekey) {
                var njwtoken = njwt.create(payload, privatekey, 'RS256');
                var base64UrlToken = njwtoken.compact();
                resolve(base64UrlToken)
            })
    })

}

function nJWTokenDetails(token) {
    console.log("TOKEN", token);
    var paramBody = 'grant_type='+base64url.escape('urn:ietf:params:oauth:grant-type:jwt-bearer')+'&assertion='+token;
    var req_params = {
        url: 'https://login.salesforce.com/services/oauth2/token',
        method: 'POST',
        headers: { 'Content-Type' : 'application/x-www-form-urlencoded'},
        body: paramBody
    };
    return new Promise(function (resolve, reject) {
        request(req_params, function (err, response, body) {
            if(err){
                reject(err);
            } else {
                var jsonbody = JSON.parse(body);
                if(jsonbody.access_token){
                    resolve(jsonbody)
                } else {
                    reject()
                }
            }

        })
    });
}

function getReportData(jsonBody) {

    var req_params = {
        url: SALESFORCE_INTERNALUSER_REPORT_URL,
        method: 'GET',
        headers: { 'Authorization' : 'Bearer '+jsonBody.access_token}
    };

    return new Promise(function (resolve, reject) {
        request(req_params, function (err, response, body) {
            if(err){
                reject(err);
            } else {
                var jsonbody = JSON.parse(body);
                if(_.isEmpty(jsonbody)){
                    reject()
                } else {
                    if(jsonbody.factMap){
                        //returning some meaning full data
                        //console.log("FINAL DATA",jsonbody.factMap['T!T'].rows);
                        resolve(jsonbody.factMap['T!T'].rows)
                    } else {
                        resolve()
                    }
                }
                
            }

        })
    });
}

function start() {
        createJWTSignedToken_NJWT_Lib()
        .then(nJWTokenDetails)
        .then(getReportData)
        .then(function (data) {            
           resolve(data)
        })
        .catch(function(err){
            console.log("Log the error here", err);
            reject()
        })

}

module.exports = {
    start: start
};
