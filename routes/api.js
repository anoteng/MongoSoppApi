const {ObjectId} = require("mongodb");
module.exports = function(app, db) {
    app.get('/api', function(req, res) {
        res.send('../public/index.html');
    });
    const collections = ['species', 'genus', 'bilder', 'edible', 'forvekslingsarter', 'quizProgress', 'imageset', 'traits', 'users']
    const ObjectId = require('mongodb').ObjectId
    for(let i of collections){
        app.get('/api/' +i, function(req, res) {
            db.db('sopp').collection(i).find({}).toArray()
                .then(result => {
                    res.send(JSON.stringify(result))
                })
        })
    }
    for(let i of collections){
        app.get('/api/' + i + '/:id', function(req, res) {
            const id = ObjectId(req.params.id);
            console.log(req.params.id)
            db.db('sopp').collection(i).findOne({"_id": id})
                .then(result => {
                    console.log(result)
                    res.send(JSON.stringify(result))
                })
        })
    }
    app.post('/api/species', function(req, res){
        const data = req.body
        console.log(req.body)
        db.db('sopp').collection('species').insertOne({
            genus: data.genus,
            species: data.species,
            norwegian: data.norwegian,
            english: data.english,
            description: data.body
        })
            .then(result => {
                console.log(result)
                res.send(JSON.stringify(result))
            })
    })
    app.delete('/api/species/:id', function(req, res){
        const id = ObjectId(req.params.id);
        // console.log(req.params.id)
        db.db('sopp').collection('species').deleteOne({"_id": id})
            .then(result => {
                console.log(result)
                res.send(JSON.stringify(result))
            })
    })
}
