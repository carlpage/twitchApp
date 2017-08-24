var myApp = angular.module('myApp');

myApp.service('TwitchService', function($http) {
  console.log('in the service');
  var sv = this;

  sv.twitchGet = function() {
    var clientId = '0m8ncsn7om53zo85ovh1lwogyy5lai';
    return $http({
      method: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/OgamingSC2' + '?client_id=' + clientId, // edit parameters
      params: {
        stream_type: 'all'
      }
    }).then(function(response) {
      console.log('in service, twitch data: ', response.data);
      sv.twitchResult = response.data;
      return response.data;
    });
  } // end twitchGet

});
