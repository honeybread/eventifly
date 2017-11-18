var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/eventsDB');

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