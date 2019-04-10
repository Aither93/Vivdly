const mongoose = require("mongoose");
const genreSchema = require("./Genre").genreSchema;

const movieSchema = new mongoose.Schema({
    title: {type: String, required: true},
    numberInStock: {type:Number, required:true, min:0},
    dailyRentalRate: {type:Number, required:true, min:0},
    genre : [{type:genreSchema, require:true}]
})

const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
    movieSchema: movieSchema,
    Movie: Movie
}

