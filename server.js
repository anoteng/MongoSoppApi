console.log('May Node be with you')
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
// const fs = require('fs');
// const doAsync = require('doasync');
//
// doAsync(fs).readFile('./.env', 'utf8')
//     .then((data) => console.log(data));
require('dotenv').config();
// console.log(process.env.ATLAS_URI)
MongoClient.connect(process.env.ATLAS_URI, (err, client) => {
    // ... do something here
    if (err) return console.error(err)
    console.log('Connected to Database')
    recursiveRoutes('routes', client)
})
app.listen(3000, function() {
    console.log('listening on 3000')
})
app.use(bodyParser.urlencoded({extended: true}))
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/html/index.html')
// })
app.use(express.static('public'))
// const api = require('./routes/api.js')
// app.use('/api', api)
// Initialize ALL routes including subfolders
const fs = require('fs');
const path = require('path');

function recursiveRoutes(folderName, db) {
    fs.readdirSync(folderName).forEach(function(file) {

        const fullName = path.join(folderName, file);
        const stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName);
        } else if (file.toLowerCase().indexOf('.js')) {
            require('./' + fullName)(app, db);
            console.log("require('" + fullName + "')");
        }
    });
}
 // Initialize it