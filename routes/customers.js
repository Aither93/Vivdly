const express = require("express");
const router = express.Router();
const Customer = require("../models/customer");

router.get("/", async(req, res) => {
    const customers = await Customer.find({});
    res.send(customers);
});
router.post("/", (req, res) => {
    const name = req.body.name; 
    const phone = req.body.phone;
    const gold = req.body.gold;
    const customer = {isGold:gold ,name: name, phone:phone};
    Customer.create(customer)
    .then(customer => res.redirect("/api/customers"))
    .catch(err => res.send(err.message)); 
})

router.get("/:id", (req, res) => {
    Customer.findById(req.params.id)
    .then(customer => res.send(customer))
    .catch(err => res.send(err.message));
})
router.put("/:id", (req, res) => {
    const name = req.body.name; 
    const phone = req.body.phone;
    const gold = req.body.gold || false;
    const customer = {isGold:gold ,name: name, phone:phone};
    Customer.findByIdAndUpdate(req.params.id, customer, {new: true})
    .then(customer => res.send(customer))
    .catch(err => res.send(err.message));
    
})
router.delete("/:id", (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
    .then(customer => {
        if(customer === null)
        {throw new Error("no user with this id");}
        res.redirect(303,"/api/customers")        
    })
    .catch(err => res.send(err.message));
    
})


module.exports = router;