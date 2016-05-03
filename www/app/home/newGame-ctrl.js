(function () {
  'use strict';

  angular.module('eliteApp')
    .filter('sumByKey', function () {
      return function (data, key) {
        if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
          return 0;
        }
        var sum = 0;
        for (var i = data.length - 1; i >= 0; i--) {
          sum += parseInt(data[i]);
        }
        return sum;
      };
    })
    .controller('newGameCtrl', newGameCtrl); // ['$scope', 'eliteApiSrv', newGameCtrl]);
  newGameCtrl.$inject = ['$scope', '$location', '$ionicPopup', 'eliteApiSrv', '$firebaseObject'];
  function newGameCtrl($scope, $location, $ionicPopup, eliteApiSrv, $firebaseObject) {
    $scope.detail = eliteApiSrv.getDetailArray('detail');

    //1. Game Info Section
    // Option 1: Use Save button to save to DB
    //$scope.gameInfo = eliteApiSrv.get('gameInfo');
    // $scope.playerInfo = eliteApiSrv.get('playerInfo');
    //Option 2: Three-way binding (then save function is obsolete. choose it wisely)
    $scope.gameInfo = eliteApiSrv.get('gameInfo'); //.$bindTo($scope, "gameInfo");
    $scope.gameInfo_new = {};
    $scope.gameInfo_new.name = "";
    $scope.gameInfo_new.amount = "";
    $scope.gameInfo_new.rule = "";

    //add gameInfo
    $scope.addGameInfo = function () {
      eliteApiSrv.saveGameInfo($scope.gameInfo_new);
    };

    //2. Player Info Section
    // Array Synchronized Call
    $scope.playerInfo = eliteApiSrv.getArray('playerInfo');
    $scope.scores = eliteApiSrv.getArray('scores');
    $scope.info = {};
    $scope.info.firstName = "";
    $scope.info.lastName = "";
    $scope.info.age = "";
    $scope.info.gender = "";
    //add players
    $scope.addPlayer = function () {
      eliteApiSrv.saveArray($scope.info);
      $scope.info = {};
      $scope.toggle(false);
    };
    //remove players
    $scope.removePlayer = function (idx) {
      $scope.playerInfo.$remove(idx);
      $scope.scores.$remove(idx);
      alert("long hold press");
    };
    // note cannot do 3-way bind on arrays; so use on-change listener and then explicit $save

    //3. Tracking Info Section
    $scope.trackWildCard = "on";
    $scope.trackJackPot = "on";
    $scope.trackLocation = "";
    $scope.toggle = function (val) {
      return $scope.showme = val;
    };


    // 4. Common Section
    // Page Navigation
    $scope.goNext = function (hash) {
      $location.path(hash);
    };
    // Pop-up
    $scope.showConfirm1 = function () {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Start New Game',
        template: 'Are you sure?'
      });
      confirmPopup.then(function (res) {
        if (res) {
          // eliteApiSrv.saveInfo($scope.gameInfo_new); //Save gameInfo
          $scope.goNext("/app/resume");
          console.log('Sure!');
        } else {
          console.log('Not sure!');
        }
      });
    };
  }
})();


/*
 (function () {
 'use strict';

 angular.module('eliteApp')
 .filter('sumByKey', function () {
 return function (data, key) {
 if (typeof (data) === 'undefined' || typeof (key) === 'undefined') {
 return 0;
 }
 var sum = 0;
 for (var i = data.length - 1; i >= 0; i--) {
 sum += parseInt(data[i]);
 }
 return sum;
 };
 })
 .controller('newGameCtrl', newGameCtrl); // ['$scope', 'eliteApiSrv', newGameCtrl]);
 newGameCtrl.$inject = ['$scope', '$location', '$ionicPopup', 'eliteApiSrv', '$firebaseObject'];
 function newGameCtrl($scope, $location, $ionicPopup, eliteApiSrv, $firebaseObject){
 $scope.detail = eliteApiSrv.getDetailArray('detail');

 //1. Game Info Section
 // Option 1: Use Save button to save to DB
 //$scope.gameInfo = eliteApiSrv.get('gameInfo');
 // $scope.playerInfo = eliteApiSrv.get('playerInfo');
 //Option 2: Three-way binding (then save function is obsolete. choose it wisely)
 $scope.gameInfo = eliteApiSrv.get('gameInfo'); //.$bindTo($scope, "gameInfo");


 //2. Player Info Section
 // Array Synchronized Call
 $scope.playerInfo = eliteApiSrv.getArray('playerInfo');
 $scope.scores = eliteApiSrv.getArray('scores');
 $scope.info = {};
 $scope.info.firstName = "";
 $scope.info.lastName = "";
 $scope.info.age = "";
 $scope.info.gender = "";
 //add players
 $scope.addPlayer = function(){
 eliteApiSrv.saveArray($scope.info);
 $scope.info = {};
 $scope.toggle(false);
 };
 //remove players
 $scope.removePlayer = function(idx){
 $scope.playerInfo.$remove(idx);
 $scope.scores.$remove(idx);
 alert("long hold press");
 };
 // note cannot do 3-way bind on arrays; so use on-change listener and then explicit $save

 //3. Tracking Info Section
 $scope.trackWildCard = "on";
 $scope.trackJackPot= "on";
 $scope.trackLocation = "";
 $scope.toggle = function(val){
 return $scope.showme = val;
 };


 // 4. Common Section
 // Page Navigation
 $scope.goNext = function (hash) {
 $location.path(hash);
 };
 // Pop-up
 $scope.showConfirm1 = function() {
 var confirmPopup = $ionicPopup.confirm({
 title: 'Start New Game',
 template: 'Are you sure?'
 });
 confirmPopup.then(function(res) {
 if(res) {
 eliteApiSrv.saveInfo($scope.gameInfo);
 // eliteApiSrv.saveInfo($scope.playerInfo);
 $scope.goNext("/app/resume");
 console.log('Sure!');
 } else {
 console.log('Not sure!');
 }
 });
 };
 }
 })();
 */
