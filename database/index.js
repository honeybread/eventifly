var mongoose = require('mongoose');
const keys = require('./../config/keys');

mongoose.connect(keys.mongoURI);

mongoose.Promise = global.Promise;

var eventsSchema = mongoose.Schema({
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    lat: String,
    long: String,
    details: mongoose.Schema.Types.Mixed
})

var EventsModel = mongoose.model("EventsModel", eventsSchema);

module.exports.eventsModel = EventsModel;