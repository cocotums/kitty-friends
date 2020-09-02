const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    picture: {
        type: String,
        required: false,
    },
    // locations: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Location",
    // }, ],
    // imgUrl: String,
    // imgUrls: [{
    //     path: String,
    //     featured: Boolean,
    // }, ],

    // lastSeen: {
    //     type: Date,
    //     default: Date.now,
    // },
    // lastFed: {
    //     type: Date,
    //     default: Date.now,
    // },
});

// const LocationsSchema = new mongoose.Schema({
//     location: String,
// });
const Cat = mongoose.model("Cat", catSchema);
//const Location = mongoose.model("Location", LocationsSchema, "locations");
module.exports = {
    Cat,
    // Location,
};