require('dotenv').config();
const crypto = require('crypto');
module.exports = function(app, db) {
    app.post('/login', function(req, res) {
        const CLIENT_ID = process.env.CLIENT_ID
        const token = req.body.idtoken
        // console.log(req.body.idtoken)

        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            db.db('sopp').collection('users').findOne({sub: userid})
                .then(user => {
                    if (!user) {
                        payload.apikey = crypto.randomBytes(32).toString('hex')
                        db.db('sopp').collection('users').insertOne(payload)
                            .then((response)=>{
                                res.send(JSON.stringify(payload.apikey))
                                //console.log(response)
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    }else{
                        payload.apikey = crypto.randomBytes(32).toString('hex')
                        db.db('sopp').collection('users').updateOne({'sub': userid}, {"$set": payload})
                            .then((response)=>{
                                //console.log(response)
                                res.send(JSON.stringify(payload.apikey))
                            })
                            .catch(err => {
                                console.error(err)
                            })
                    }
                })
                .catch(err => {
                    console.error(err)
                })

        }
        verify().catch(console.error);
    });



}