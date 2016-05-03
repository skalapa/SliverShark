/*(function(){
 angular.module('eliteApp').factory('eliteApiSrv', [eliteApiSrv]);
 function eliteApiSrv(){
 var names = '[{ "firstName": "John","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample7.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Sara","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Laura","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Smith","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Jenn","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Kathy","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}, ' +
 '{ "firstName": "Paul","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg",' +
 '"scores": ["20","0","10", "10", "20", "6"]}]';

 var color = JSON.parse(names);
 function getColor(){
 return color;
 }

 return {
 getColor: getColor
 };

 };
 })();*/

(function () {
  angular.module('eliteApp')
    .service('eliteApiSrv', eliteApiSrv);
  eliteApiSrv.$inject = ['$firebaseObject', '$firebaseArray'];

  // Function 1
  function eliteApiSrv($firebaseObject, $firebaseArray) {
    var names = '[{ "total": "", "firstName": "John","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample7.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Sara","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Laura","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Smith","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Jenn","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Kathy","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample9.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}, ' +
      '{ "firstName": "Paul","lastName": "Doe","photo": "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample6.jpg",' +
      '"scores": ["20","0","10", "10", "20", "6"]}]';

    var color = JSON.parse(names);
    this.getColor = function () {
      return color;
    };

    var url = new Firebase("https://flickering-heat-8025.firebaseio.com/info/detail/0/");
    var ref1 = $firebaseArray(url.child('playerInfo'));
    var ref2 = $firebaseArray(url.child('scores'));
    var ref3 = $firebaseArray(url.child('gameInfo'));

    //synchronized Object Ref
    var ref = new Firebase('https://flickering-heat-8025.firebaseio.com/');
    var ref4 = ref.child('info').child('detail');
    this.get = function (nb) {
      return $firebaseObject(ref.child('info').child('detail').child(nb));
    };

    this.getDetailArray = function (nb) {
      return $firebaseArray(ref.child('info').child(nb));
    };

    this.getDetail = function () {
      return $firebaseObject(ref.child('info').child(nb));
    };

    //synchronized Array Ref (all server changes are applied in realtime)
    var playerInfoRef = new Firebase('https://flickering-heat-8025.firebaseio.com/');
    this.getArray = function (nb) {
      return $firebaseArray(ref.child('info').child('detail').child(nb));
    };

    var array = '{ status: "", "gameInfo": {}, "playerInfo": {}, "scores": [{}]}';

    // calling $save() on the synchronized object syncs all data back to our database
    this.saveGameInfo = function (info) {
      ref4.push().set(array);
      /* info.date = new Date().toLocaleDateString();
       info.gameNo = Firebase.ServerValue.TIMESTAMP;
       info.$save().then(function() {
       alert('Info savedd!');
       }).catch(function(error) {
       alert('Errorr!');
       });*/
    };

    // $add on a synchronized array is like Array.push() except it saves to the database!
    this.saveArray = function (d) {
      ref1.$add({
        age: d.age,
        gender: d.gender,
        lastName: d.lastName,
        firstName: d.firstName,
        id: Firebase.ServerValue.TIMESTAMP
      });
      ref2.$add({
        val: "0",
        id: Firebase.ServerValue.TIMESTAMP
      });
    };

    return {
      getColor: this.getColor,
      get: this.get,
      getDetailArray: this.getDetailArray,
      getArray: this.getArray,
      saveArray: this.saveArray,
      saveGameInfo: this.saveGameInfo
    };

  };
})();
