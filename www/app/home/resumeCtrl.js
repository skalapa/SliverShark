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
    .controller('resumeCtrl', resumeCtrl); // ['$scope', 'eliteApiSrv', resumeCtrl]);
  resumeCtrl.$inject = ['$scope', '$ionicPopup', 'eliteApiSrv'];
  function resumeCtrl($scope, $ionicPopup, eliteApiSrv) {
    $scope.color = eliteApiSrv.getColor();

    //Option 2: Three-way binding (then save function is obsolete. choose it wisely)
    $scope.gameInfo = eliteApiSrv.get('gameInfo'); //.$bindTo($scope, "gameInfo");
    $scope.detail = eliteApiSrv.getDetailArray('detail');

    // Array Synchronized Call
    $scope.playerInfo = eliteApiSrv.getArray('playerInfo');
    $scope.scores = eliteApiSrv.getArray('scores');

    //total
    $scope.total = function (data) {
      var total = 0;
      for (var i = data.length - 1; i >= 0; i--) {
        total += parseInt(data[i]);
      }
      return total;
    };

    // remove row
    $scope.removeItem = function (index) {
      $scope.color.scores.splice(index, 1);
    };

    // add row
    $scope.addLine = function () {
      var color1 = eliteApiSrv.getColor();
      for (var i = 0; i < color1.length; i++) {
        color1[i].scores.push(0);
      }
      $scope.color = color1;
    };

    // total
    $scope.setTotal = function (item) {
      if (item) {
        var result = parseInt(item, 10);
        $scope.total = $scope.total + result;
      }
    };

    //reset total
    $scope.reSetTotal = function () {
      $scope.total = 0;
    };

// When button is clicked, the popup will be shown...
    $scope.showConfirm = function () {

      var confirmPopup = $ionicPopup.confirm({
        title: 'Game Complete',
        template: 'Are you sure?'
      });

      confirmPopup.then(function (res) {
        if (res) {
          console.log('Sure!');
        } else {
          console.log('Not sure!');
        }
      });

    };

  }
})();

