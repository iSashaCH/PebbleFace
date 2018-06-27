var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function locationSuccess(pos) {  
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' +
  pos.coords.latitude + '&lon=' + pos.coords.longitude + '&appid=4ab8c6d5c8788f36d21161f20ffa0b08' ;
  xhrRequest(url, 'GET', 
    function(responseText) {
      var json = JSON.parse(responseText);   
      var dictionary = {
        'KEY_TEMPERATURE': Math.round(json.main.temp - 273.15),
        'KEY_CONDITIONS': json.weather[0].main
      };
      Pebble.sendAppMessage(dictionary);
    }            
  ); 
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(
    locationSuccess,null,
    {timeout: 15000, maximumAge: 60000}
  );
}

Pebble.addEventListener('ready', 
  function(e) {
    getWeather();
  }
);

Pebble.addEventListener('appmessage',
  function(e) {
    getWeather();
  }                     
);




 