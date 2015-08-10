// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic','starter.values', "starter.services","starter.controllers","starter.directives","ngResource"]);

ionicApp.run(function($ionicPlatform, $localStorage) {
  $localStorage.set("name","13056961943");
  $localStorage.set("pwd","000000");
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(navigator.splashscreen) {
      navigator.splashscreen.hide();
    }
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
      .state('mySchedule',{
          url: '/mySchedule',
          templateUrl: 'templates/main/mySchedule.html'
      })
      .state('bikebon',{
        url: '/bikebon',
        abstract: true,
        templateUrl: 'templates/bikes.html'
      })
      .state('bikebon.home',{
        url: '/home',
        views: {
          'bike-home': {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
          }
        }
      })
      .state('bikebon.rentBike',{
        url: '/rentBike',
        views: {
          'bike-rentBike': {
            templateUrl: 'templates/rentBike.html',
            controller: 'rentBikeCtrl'
          }
        }
      })
      .state('bikebon.bikeList',{
          url: '/rentBike/:bike_type_id',
          views: {
              'bike-rentBike': {
                  templateUrl: 'templates/main/bikeDetail.html',
                  controller: 'bikeDetailCtrl'
              }
          }
      })
      .state('bikebon.find',{
        url: '/find',
        views: {
          'bike-find': {
            templateUrl: 'templates/find.html'
          }
        }
      })
      .state('bikebon.mySays',{
          url: '/mySays',
          views: {
              'bike-find': {
                  templateUrl: 'templates/find/mySays.html'
              }
          }
      })
      .state('bikebon.mine',{
        url: '/mine',
        views: {
          'bike-mine': {
            templateUrl: 'templates/mine.html'
          }
        }
      })
      .state('bikebon.myPurse',{
        url:'/myPurse',
        views:{
          'bike-mine':{
            templateUrl: 'templates/mine/myPurse.html'
          }
        }
      })
      .state('bikebon.income',{
          url:'/income',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/incomeAndExpenses.html',
                  controller: 'incomeCtrl'
              }
          }
      })
      .state('bikebon.myCoupon',{
        url:'/myCoupon',
        views:{
          'bike-mine':{
            templateUrl: 'templates/mine/myCoupon.html'
          }
        }
      })
      .state('bikebon.myOrder',{
        url:'/myOrder',
        views:{
          'bike-mine':{
            templateUrl: 'templates/mine/myOrder.html'
          }
        }
      })
      .state('bikebon.evaluateOrder',{
          url:'/evaluateOrder',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/main/evaluateOrder.html'
              }
          }
      })
      .state('bikebon.feedback',{
          url:'/feedback',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/feedback.html'
              }
          }
      })
      .state('bikebon.aboutBikebon',{
          url:'/aboutBikebon',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/aboutBikebon.html'
              }
          }
      })
      .state('bikebon.settings',{
          url:'/settings',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/settings.html'
              }
          }
      })
      .state('bikebon.identity',{
          url:'/identity',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/identity.html'
              }
          }
      });

  $urlRouterProvider.otherwise("/login");

});
