var myApp = angular.module('myApp', []);

myApp.controller('twitchController', function($http) {
  console.log('in the controller');

  var vm = this;

  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  vm.all = [];
  vm.online = [];
  vm.offline = [];
  vm.userGroup = vm.all;
  console.log(vm.userGroup);

  users.forEach(function(user) {
    console.log(user);
    var userObject = {};
    var clientId = '0m8ncsn7om53zo85ovh1lwogyy5lai';
    return $http({
      method: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + user + '?client_id=' + clientId, // edit parameters
      params: {
        stream_type: 'all'
      }
    }).then(function(response) {
      console.log(response);
      userObject.name = response.data.stream.channel.display_name;
      userObject.url = response.data.stream.channel.url;
      userObject.status = response.data.stream.channel.status;
      if (response.data.stream.channel.logo === null) {
        userObject.logo = "http://placehold.it/50.png/";
      } else {
        userObject.logo = response.data.stream.channel.logo;
      }
      if (response.data.stream.stream_type === 'live') {
        userObject.isOnline === true;
        vm.online.push(userObject)
      } else if(response.data.stream === null) {
        userObject.isOnline === false;
        vm.offline.push(userObject)
      }
      vm.all.push(userObject);
    }) // end then
  }); // end forEach

  // vm.searchUser = function() {
  //   console.log('in searchUser');
  //   var clientId = '0m8ncsn7om53zo85ovh1lwogyy5lai';
  //   return $http({
  //     method: 'GET',
  //     url: 'https://api.twitch.tv/kraken/streams/' + vm.user + '?client_id=' + clientId, // edit parameters
  //     params: {
  //       stream_type: 'all'
  //     }
  //   }).then(function(response) {
  //     if (response.data.stream === null) {
  //       swal({
  //         title: "Error!",
  //         text: "User not found!",
  //         type: "error",
  //         confirmButtonText: "Cool"
  //       }); // end sweet alert
  //     } // end if
  //     console.log('twitch data: ', response.data);
  //     vm.results = response.data.stream;
  //     vm.channel = vm.results.channel;
  //     console.log(vm.results);
  //     return response.data;
    // }); // end then
  // } // end searchUser

}); // end controller
