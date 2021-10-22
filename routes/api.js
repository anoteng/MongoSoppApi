module.exports = function(app, db) {
    app.get('/api', function(req, res) {
        res.send('../public/index.html');
    });
    const collections = ['species', 'genus', 'bilder', 'edible', 'forvekslingsarter', 'quizProgress', 'imageset', 'traits', 'users']

    for(let i of collections){
        app.get('/api/' +i, function(req, res) {
            db.db('sopp').collection(i).find({}).toArray()
                .then(result => {
                    res.send(JSON.stringify(result))
                })
        })
    }
    for(let i of collections){
        app.get('/api/' + i + ':id', function(req, res) {
            const id = parseInt(req.params.id);
            db.db('sopp').collection(i).findOne({"_id": id})
                .then(result => {
                    res.send(JSON.stringify(result))
                })
        })
    }
}
