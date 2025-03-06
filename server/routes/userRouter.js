//? ==================================== 
//?             Requirements 
//? ==================================== 
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");

//? Model
const { User } = require("../models/UserModel");

//? Validation
const { validateUser } = require("../validations/userValidation");


//? ==================================== 
//?                Get
//? ==================================== 
router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//? ==================================== 
//?                Post
//? ==================================== 
router.post("/", validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
  
    try {
        const { email, password, isAdmin, username } = req.body;
        const newUser = new User({ email, password, isAdmin, username });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
  });

//? ==================================== 
//?              Patch
//? ==================================== 
router.patch("/:id", async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//? ==================================== 
//?             Delete
//? ==================================== 
router.delete("/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//? ====================================
//?               Export
//? ====================================
module.exports = router;
