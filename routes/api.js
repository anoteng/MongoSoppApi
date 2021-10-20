module.exports = function(app, db) {
    let currentUser = {}
    app.get('/api', function(req, res) {
        res.send('../public/index.html');
    });
    const collections = ['species', 'genus', 'bilder', 'edible', 'forvekslingsarter', 'quizProgress', 'imageset', 'traits', 'users']

    for(let i of collections){
        app.get('/api/' +i, function(req, res) {
            // console.log(req.headers)
            verifyApiKey(req.header('X-API-Key'))
                .then(result =>{
                    if(result){
                        db.db('sopp').collection(i).find({}).toArray()
                            .then(result => {
                                res.send(JSON.stringify(result))
                            })
                    }
                })
                .catch(err => {console.error(err)})

            // console.log(db.db('sopp').collection('species').find({}).toArray())
        })
    }

    function verifyApiKey(key) {
        const promise = new Promise((resolve, reject) => {
            //console.log(key)
            db.db('sopp').collection('users').findOne({"apikey": key})
                .then(user => {
                    //console.log(user)
                    if(user){
                        currentUser = user
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
        return promise
    }
}
