// AWS Cognito set-up
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");
const request = require("request");
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");
global.fetch = require("node-fetch");

const poolData = {
  UserPoolId: "us-east-2_Iv3G5mB9P", // Your user pool id here
  ClientId: "1rivphnaill912p4etppi53f6j" // Your client id here
};

const pool_region = "us-east-2";

module.exports.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports.authDetails = (username, password) =>
  new AmazonCognitoIdentity.AuthenticationDetails({
    Username: username,
    Password: password
  });

module.exports.cognitoUser = username =>
  new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: poolData.UserPoolId
  });

const signUp = (email, password) =>
  userPool.signUp(email, password, null, null, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    const cognitoUser = result.user;
    console.log("user name is " + cognitoUser.getUsername());
  });
