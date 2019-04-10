const mongoose = require("mongoose");


const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name:String,
            isGold: Boolean,
            phone: String
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: String,
            dailyRentalRate: {
                type: Number,
                min: 0
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports.Rental = Rental;