const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();
const Rental = require("../models/rentals").Rental;
const Movie = require("../models/movies").Movie;
const Customer = require("../models/customer");
Fawn.init(mongoose);
router.get("/", (req, res) => {
    Rental.find({}).sort("-dateOut")
    .then(rentals => res.send(rentals))
    .catch(err => res.send(err.message));  
})

router.post("/", async (req, res) => {
    const customer = await validateCutomer(req)
    .catch(err => res.send(err.message));
    const movie = await validateMovie(req)
    .catch(err => res.send(err.message));
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone,
            isGold: customer.isGold
        },
        movie:{
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })
    try {
        if(movie.numberInStock === 0){res.send(`${movie.name} isn't available`)}
        new Fawn.Task()
        .save("rentals", rental)
        .update("movies", {_id: movie._id},{
        $inc: {numberInStock: -1} 
    })
    .run()
    res.send(rental);
    }
    catch(ex){
        res.Status(500);
    }
})

router.delete ("/", (req, res) => {
    Rental.remove()
    .then(deleted => res.redirect(303, "/api/rentals"))
    .catch(err => res.send(err.message))
})

async function validateCutomer(req){
    const customer = await Customer.findById(req.body.customerId)
    if (!customer) {throw new Error("Customer Not Found")}
    return customer;
}
async function validateMovie(req){
    const movie = await Movie.findById(req.body.movieId)
    if (!movie){throw new Error("Movie Not Found")}
    return movie;
}






module.exports = router;