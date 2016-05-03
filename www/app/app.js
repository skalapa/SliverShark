angular.module('eliteApp', ['ionic', 'ionic-letter-avatar', 'firebase'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('home', {
        url: '/home',
        abstract: false, //can not navigate directly
        templateUrl: 'app/home/home.html'
      })

      .state('home.resume', {
        url: "/resume",
        views: {
          "card_resume": {
            templateUrl: "app/resume/resume.html"
          }
        }
      })

      .state('home.newGame', {
        url: "/newGame",
        views: {
          "card_newGame": {
            templateUrl: "app/newGame/newGame.html"
          }
        }
      })

      .state('home.editRules', {
        url: "/editRules",
        views: {
          "card_editRules": {
            templateUrl: "app/editRules/editRules.html"
          }
        }
      })

      .state('app', {
        url: "/app",
        templateUrl: "app/layout/menu-layout.html"
      })

      .state('app.resume', {
        url: "/resume",
        views: {
          "mainContent": {
            templateUrl: "app/resume/resume.html"
          }
        }
      })

      .state('app.newGame', {
        url: "/newGame",
        views: {
          "mainContent": {
            "templateUrl": "app/newGame/newGame.html"
          }
        }

      })

      .state('app.editRules', {
        url: "/editRules",
        views: {
          "mainContent": {
            "templateUrl": "app/editRules/editRules.html"
          }
        }

      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app');
  });
