const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema and model

const visitorSchema = new Schema({
    name : String,
    email: String,
    phone: Number,
});

const hostSchema = new Schema({
    name : String,
    email: String,
    phone: Number
});

const entrySchema = new Schema({
    host : hostSchema,
    visitor : visitorSchema,
    checkin: String,
    checkout: String

});


const Host = mongoose.model('host', hostSchema);
const Visitor = mongoose.model('visitor', visitorSchema);
const Entry = mongoose.model('entry', entrySchema);

module.exports = {host: Host, visitor: Visitor, entry: Entry};