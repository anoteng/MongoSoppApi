console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser')
const OktaJwtVerifier = require('@okta/jwt-verifier')

const app = express();
const MongoClient = require('mongodb').MongoClient
// const fs = require('fs');
// const doAsync = require('doasync');
//
// doAsync(fs).readFile('./.env', 'utf8')
//     .then((data) => console.log(data));
require('dotenv').config();
console.log(process.env)
const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: process.env.OKTA_CLIENT,
    issuer: process.env.OKTA_ISSUER
})
MongoClient.connect(process.env.ATLAS_URI, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    app.listen(8080, function() {
        console.log('listening on 8080')
    })
    app.use(bodyParser.urlencoded({extended: true}))
    require('./routes/api')(app, client)
})
