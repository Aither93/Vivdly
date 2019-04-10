const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Genre = require("../models/Genre").Genre;
const asyncMiddleware = require("../middleware/async");
//const genres = ["action","drama","comedy" ];
//Get all Genres Availavle.
router.get("/", asyncMiddleware(async (req, res) => {
    const genres = await Genre
    .find({})
    .sort("name");
    res.send(genres);
    
}));
//Getting a specific genre
router.get("/:genre", (req, res) => {
    const genreParam = req.params.genre.toLowerCase();
    Genre.findOne({name: genreParam})
    .then(genre => {
        if(genre === null){throw new Error("Not Fount");}
        res.send(genre)
        })
    .catch( (err) => {
        res.send(err.message)
        })
})
//Creating a new genre
router.post("/", auth, (req, res) => {
    Genre.create({name: req.body.name})
    .then(genre => res.redirect("/api/genres"))
    .catch(err => res.send(err.message));
});

//updatign a genre
router.put("/:genre", auth, (req, res ) => {
    const genreParam =req.params.genre.toLowerCase();
    Genre.findOneAndUpdate({name: genreParam},
        {name: req.body.name}, {new: true})
        .then(genre => res.send(genre))
})
router.delete("/:genre", [auth, admin], (req, res) => {
    const genreParam =req.params.genre.toLowerCase();
    Genre.findOneAndDelete({name: genreParam})
    .then(genre => {
        if(genre === null){throw new Error("Not Fount");}
        res.redirect(303, "/api/genres")})
    .catch(err => res.send(err.message));

    // old code without database
    // const genre = find(req.params.genre);
    // if(!genre){
    //     res.sendStatus(404);
    // }
    // else {
    //     const index = genres.indexOf(genre);
    //     genres.splice(index, 1);
    //     res.send(genres);
    // }
})

// loacting a specific :genre in the genres array
// const find = (genreName) => {
//     return genres.find((element) => {
//             return element === genreName;
//     })
    
// }


module.exports = router;