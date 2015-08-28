// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic','starter.values','starter.filters','starter.services','starter.controllers','starter.directives','ngResource']);

ionicApp.run(function($ionicPlatform, $localStorage, Push) {
  if($localStorage.get("token") === "undefined" || $localStorage.get("token") === undefined){
      $localStorage.set("token", "");
  }
  if($localStorage.get("lender_id") === "undefined" || $localStorage.get("lender_id") === undefined){
      $localStorage.set("lender_id", 1);
  }
    // push notification callback
    var notificationCallback = function(data) {
        console.log('received data :' + data);
        var notification = angular.fromJson(data);
        //app 是否处于正在运行状态
        var isActive = notification.notification;

        // here add your code


        //ios
        if (true) {
            window.alert(notification);

        }
    };
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
//初始化
      Push.init(notificationCallback);
      //设置别名
      Push.setAlias("12345678");
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
            templateUrl: 'templates/mine/myOrder.html',
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
      .state('bikebon.immediatePay',{
          url:'/immediatePay',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/main/immediatePay.html'
              }
          }
      })
      .state('bikebon.cancellationOrder',{
          url:'/cancellationOrder',
          views:{
              'bike-mine':{
                  templateUrl: 'templates/main/cancellationOrder.html'
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
})
    .factory('Push', function() {
        var push;
        return {
            setBadge: function(badge) {
                if (push) {
                    console.log('jpush: set badge', badge);
                    plugins.jPushPlugin.setBadge(badge);
                }
            },
            setAlias: function(alias) {
                if (push) {
                    console.log('jpush: set alias', alias);
                    plugins.jPushPlugin.setAlias(alias);
                }
            },
            check: function() {
                if (window.jpush && push) {
                    plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
                    window.jpush = null;
                }
            },
            init: function(notificationCallback) {
                console.log('jpush: start init-----------------------');
                push = window.plugins && window.plugins.jPushPlugin;
                if (push) {
                    console.log('jpush: init');
                    plugins.jPushPlugin.init();
                    plugins.jPushPlugin.setDebugMode(true);
                    plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
                    plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
                }
            }
        };
    });