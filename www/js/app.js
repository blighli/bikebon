// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic','starter.values','starter.filters','starter.services','starter.controllers','starter.directives','ngResource']);

ionicApp.run(function($ionicPlatform, $localStorage) {
  if($localStorage.get("token") === "undefined" || $localStorage.get("token") === undefined){
      $localStorage.set("token", "");
  }
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

ionicApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .state('map',{
          url: '/map',
          templateUrl: 'templates/map.html'
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
            templateUrl: 'templates/mine.html',
            controller: 'mineCtrl'
          }
        },
        cache: false
      })
      .state('bikebon.myBalance',{
          url:'/myBalance',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/myBalance.html'
              }
          }
      })
      .state('bikebon.normalTime',{
          url:'/normalTime',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/normalTime.html'
              }
          }
      })
      .state('bikebon.advancedTime',{
          url:'/advancedTime',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/mine/advancedTime.html'
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
      .state('bikebon.orderDetail',{
          url:'/orderDetail',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/main/orderDetail.html'
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
                  templateUrl: 'templates/mine/identity.html',
                  controller: 'identityCtrl'
              }
          }
      });
  $urlRouterProvider.otherwise("/bikebon/home");
});
