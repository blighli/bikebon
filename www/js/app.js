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
ionicApp.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('standard');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('left');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html'
      })
      .state('bike',{
        url: '/bike',
        abstract: true,
        templateUrl: 'templates/bikes.html'
      })
      .state('bike.home',{
        url: '/home',
        views: {
          'bike-home': {
            templateUrl: 'templates/home.html',
            controller: 'imgCtrl'
          }
        }
      })
      .state('bike.rentBike',{
        url: '/rentBike',
        views: {
          'bike-rentBike': {
            templateUrl: 'templates/rentBike.html',
            controller: 'bikeCtrl'
          }
        }
      })
      .state('bike.find',{
        url: '/find',
        views: {
          'bike-find': {
            templateUrl: 'templates/find.html'
          }
        }
      })
      .state('bike.mine',{
        url: '/mine',
        views: {
          'bike-mine': {
            templateUrl: 'templates/mine.html'
          }
        }
      })
      .state('bike.myPurse',{
        url:'/myPurse',
        views:{
          'bike-mine':{
            templateUrl: 'templates/mine/myPurse.html'
          }
        }
      });

  $urlRouterProvider.otherwise("/bike/home");

});
