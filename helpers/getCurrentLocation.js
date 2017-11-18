// Function uses html's default geolocation.
export function getLocation (geoLocation, callback){
  geoLocation.getCurrentPosition(success,error);

  function success(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    callback('', position);
  }

  function error(){
    callback('Unable to obtain position', []);
  }
}