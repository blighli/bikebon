// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic',"starter.controllers"]);

ionicApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

     //启动极光推送服务
      window.plugins.jPushPlugin.init();
      //调试模式
      window.plugins.jPushPlugin.setDebugMode(true);
  });
});

ionicApp.config(function($stateProvider, $urlRouterProvider){
    $stateProvider
        .state('bike',{
            url: '/bike',
            abstract: true,
            templateUrl: "templates/bike.html"
        })
        .state('bike.bikeList',{
            url: '/bikeList',
            views: {
                'bikeContent': {
                    templateUrl: "templates/bikeList.html",
                    controller: 'bikeListCtrl'
                }
            }
        })
        .state('bike.bikeDetail',{
            url: '/bikeList/:bikeId',
            views: {
                'bikeContent': {
                    templateUrl: "templates/bikeDetail.html"
                }
            }
        })
        .state('bike.home',{
            url: '/home',
            views: {
                'bikeContent': {
                    templateUrl: "templates/home.html",
                    controller: 'imgCtrl'
                }
            }
        })
        .state('bike.mine',{
            url: '/mine',
            views:{
                'bikeContent':{
                    templateUrl: "templates/mine.html"
                }
            }
        })
        .state('bike.map',{
            url:'/map',
            views:{
                'bikeContent':{
                    templateUrl: "templates/map.html",
                    controller: 'mapListCtrl'
                }
            }
        })
        .state('bike.activity',{
            url: '/activity',
            views:{
                'bikeContent':{
                    templateUrl: "templates/activity.html",
                    controller: 'activityListCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/bike/home');
});

ionicApp.controller('mapListCtrl',function($scope){
    $scope.payData = {
        "pay": [
            {
                "deposit": 100,
                "rent": 50,
                "maxPay": 100
            }
        ]
    }
});
