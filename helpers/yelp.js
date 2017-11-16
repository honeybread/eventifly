import axios from 'axios';

export function getYelpEvents (location) {
    axios.get('/events/yelp', {params:{location: location}})
        .then(function(response) {
            console.log("successfully called yelp")
            console.log("yelp data", response);
        })
        .catch(function(error){
            console.log(error);
        });
}

