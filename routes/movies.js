const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {movieSchema ,Movie} = require("../models/movies");
const Genre = require("../models/Genre").Genre;

router.get("/", (req, res) => {
    Movie.find({})
    .then(movies => res.send(movies))
    .catch(err => res.send(err.message))
});

router.post("/", auth, async (req, res) => {
    const movie = await CreateMovieModel(req, res)
    .catch(err => res.send(err.message));
    Movie.create(movie)
    .then(movie => res.send(movie))
    .catch(err => res.send(err.message))
})

router.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
    .then(movie => {
        if(movie === null){throw new Error("Movie not found")}
        else{
            res.send(movie)
        }
    })
    .catch(err => res.send(err.message))
})
router.put("/:id", auth, async (req, res) => {
   const updatedMovie = await CreateMovieModel(req)
   .catch(err => res.send(err.message));
    Movie.findByIdAndUpdate(req.params.id, updatedMovie, {new:true})
    .then(movie => res.send(movie))
    .catch(err => res.send(err.message))
})

router.delete("/:id", auth, (req, res) => {
    Movie.findByIdAndRemove(req.params.id)
    .then(movie => res.redirect(303, "/api/movies"))
    .catch(err => res.send(err.message))
})




 async function CreateMovieModel (req){
    const genreId = req.body.genreId;
    const title = req.body.title;
    const numberInStock = req.body.numberInStock;
    const dailyRentalRate = req.body.dailyRentalRate;
    console.log(title);
    const genre = await genreValidation(genreId);
    return movie ={
        title: title,
        numberInStock: numberInStock,
        dailyRentalRate: dailyRentalRate,
        genre:[{
            _id: genre._id,
            name: genre.name
        }]
    }

}

async function genreValidation(genreId){
    const genre = await Genre.findById(genreId);
    if(!genre){throw new Error("Genre Not Found")}
    else{
        return genre
    } 
}

genreValidation("5c7ece0033a0d02dfcf3939d");


module.exports = router;