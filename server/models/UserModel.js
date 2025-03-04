//? ==================================== 
//?             Requirements 
//? ==================================== 
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//? ==================================== 
//?             User Schema 
//? ==================================== 
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: true },
    username: { type: String, required: true }
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", userSchema);

//? ==================================== 
//?     Create Default Admin User 
//? ==================================== 
User.find({})
    .then(async (data) => {
        if (data.length === 0) {
            const user = new User({
                email: "admin@mail.com",
                password: "admin",
                isAdmin: true,
                username: "admin"
            });
            await user.save();
            console.log("Default User Created");
        }
    })
    .catch(err => console.log(err));

//? ====================================
//?               Export
//? ====================================
module.exports = { User }
