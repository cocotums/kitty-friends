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
    location: [{
        type: Number,
        required: true,
    }, ],
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

const Cat = mongoose.model("Cat", catSchema);
module.exports = Cat;