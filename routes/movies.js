import mongojs from 'mongojs';

const db = mongojs('DatabaseMovies', [
    'movies'
]);

module.exports = app => {

    app.get('/movies', (req, res) => {
        db.movies.find((err, movies) => {
            res.json({
                movies
            });
        });
    });

    app.post('/movies', (req, res) => {
        if(!req.body.title || !req.body.director || !req.body.genre || !req.body.year) {
            res.status(400).json({
                "error": "Fields title, director, genre and year are required."
            });
        } else {
            let newMovie = {
                title: req.body.title,
                director: req.body.director,
                genre: req.body.genre,
                year: req.body.year
            };
    
            db.movies.insert(newMovie, (err, movie) => {
                res.status(201).json({
                    movie
                });
            });
        }
    });

    app.put('/movies/:id', (req, res) => {
        let updatedMovie = req.body;

        db.movies.updateOne(
            { _id: mongojs.ObjectId(req.params.id) }, 
            { $set: updatedMovie }, 
            {}, 
            (err, movie) => {
                res.json({
                    movie
            });
        });
    });

    app.delete('/movies/:id', (req, res) => {
        db.movies.remove({
            _id: mongojs.ObjectId(req.params.id)
        }, (err, response) => {
            res.json({
                response
            });
        });
    });
};