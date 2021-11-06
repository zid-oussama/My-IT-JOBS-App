const mongoose = require("mongoose");
const config = require("config");
const db = config.get("URI");

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("DB connected");
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
