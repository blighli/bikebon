// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var ionicApp = angular.module('starter', ['ionic','starter.values','starter.filters','starter.services','starter.controllers','starter.directives','ngResource']);

ionicApp.run(function($ionicPlatform, $localStorage, Push) {
  if("undefined" === $localStorage.get("token")  || undefined === $localStorage.get("token")){
      $localStorage.set("token", "");
  }
  if("undefined" === $localStorage.get("userName")  || undefined === $localStorage.get("userName")){
      $localStorage.set("username", "   ");
  }
  if("undefined" === $localStorage.get("remainder")  || undefined === $localStorage.get("remainder")){
      $localStorage.set("remainder", "0.00");
  }
  if("undefined" === $localStorage.get("normalTime")  || undefined === $localStorage.get("normalTime")){
      $localStorage.set("normalTime", "0.00");
  }
  if("undefined" === $localStorage.get("superTime")  || undefined === $localStorage.get("superTime")){
      $localStorage.set("superTime", "0.00");
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
    //Push.setAlias("12345678");
  });
});

ionicApp.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

      //20150830-02:30对所有页面的分类整理_gj
      //login页面
      .state('login',{
        url: '/login',
        templateUrl: 'templates/root/login.html',
        controller: 'loginCtrl'
      })

      //home页面
      .state('aboutUs',{
          url:'/aboutUs',
          templateUrl: 'templates/root/aboutUs.html'
      })
      .state('map',{
          url: '/map',
          templateUrl: 'templates/home/map.html'
      })
      .state('mySchedule',{
          url: '/mySchedule',
          templateUrl: 'templates/home/mySchedule.html'
      })

      //rentBike页面
      .state('bikeList',{
          url: '/rentBike/:bike_type_id',
          templateUrl: 'templates/rentBike/bikeDetail.html',
          controller: 'bikeDetailCtrl'
      })

      //find页面
      .state('mySays',{
          url: '/mySays',
          templateUrl: 'templates/find/mySays.html',
          controller: 'informationCtrl'
      })

      //mine页面
      .state('myOrder',{
          url:'/myOrder',
          templateUrl: 'templates/mine/myOrder.html'
      })
      .state('orderDetail',{
          url:'/orderDetail',
          templateUrl: 'templates/mine/orderDetail.html'
      })
      .state('evaluateOrder',{
          url:'/evaluateOrder',
          templateUrl: 'templates/mine/evaluateOrder.html'
      })
      .state('immediatePay',{
          url:'/immediatePay',
          templateUrl: 'templates/mine/immediatePay.html'
      })
      .state('cancellationOrder',{
          url:'/cancellationOrder',
          templateUrl: 'templates/mine/cancellationOrder.html'
      })
      .state('paySuccess',{
          url:'/paySuccess',
          templateUrl: 'templates/mine/paySuccess.html'
      })
      .state('myBalance',{
          url:'/myBalance',
          templateUrl: 'templates/mine/myBalance.html',
          controller: 'balanceCtrl'
      })
      .state('myMoney',{
          url:'/myMoney',
          templateUrl: 'templates/mine/myMoney.html'
      })
      .state('firstMoney',{
          url:'/firstMoney',
          templateUrl: 'templates/mine/firstMoney.html'
      })
      .state('secondMoney',{
          url:'/secondMoney',
          templateUrl: 'templates/mine/secondMoney.html'
      })
      .state('getMoney',{
          url:'/getMoney',
          templateUrl: 'templates/mine/getMoney.html'
      })
      .state('identitySuccess',{
          url:'/identitySuccess',
          templateUrl: 'templates/mine/identitySuccess.html'
      })
      .state('getSuccess',{
          url:'/getSuccess',
          templateUrl: 'templates/mine/getSuccess.html'
      })
      .state('getTixian',{
          url:'/getTixian',
          templateUrl: 'templates/mine/getTixian.html'
      })
      .state('normalTime',{
          url:'/normalTime',
          templateUrl: 'templates/mine/normalTime.html',
          controller: 'normalCtrl'
      })
      .state('advancedTime',{
          url:'/advancedTime',
          templateUrl: 'templates/mine/advancedTime.html',
          controller: 'advanceCtrl'
      })
      .state('myCoupon',{
          url:'/myCoupon',
                  templateUrl: 'templates/mine/myCoupon.html'
      })
      .state('myInformation',{
          url:'/myInformation',
          templateUrl: 'templates/mine/myInformation.html',
          controller: 'informationCtrl'
      })
      .state('myId',{
          url:'/myId',
          templateUrl: 'templates/mine/myId.html'
      })
      .state('mySex',{
          url:'/mySex',
          templateUrl: 'templates/mine/mySex.html'
      })
      .state('feedback',{
          url:'/feedback',
          templateUrl: 'templates/mine/feedback.html'
      })
      .state('mySecret',{
          url:'/mySecret',
          templateUrl: 'templates/mine/mySecret.html'
      })
      .state('aboutBikebon',{
          url:'/aboutBikebon',
          templateUrl: 'templates/mine/aboutBikebon.html'
      })
      .state('settings',{
          url:'/settings',
          templateUrl: 'templates/mine/settings.html',
          controller: 'settingCtrl'
      })
      .state('identity',{
          url:'/identity',
          templateUrl: 'templates/mine/identity.html',
          controller: 'identityCtrl'
      })

      //四个主页面
      .state('bikebon',{
        url: '/bikebon',
        abstract: true,
        templateUrl: 'templates/root/bikes.html'
      })
      .state('bikebon.home',{
        url: '/home',
        views: {
          'bike-home': {
            templateUrl: 'templates/root/home.html',
            controller: 'homeCtrl'
          }
        }
      })
      .state('bikebon.rentBike',{
        url: '/rentBike',
        views: {
          'bike-rentBike': {
            templateUrl: 'templates/root/rentBike.html',
            controller: 'rentBikeCtrl'
          }
        }
      })
      .state('bikebon.find',{
          url: '/find',
          views: {
              'bike-find': {
                  templateUrl: 'templates/root/find.html'
              }
          }
      })
      .state('bikebon.mine',{
          url: '/mine',
          views: {
              'bike-mine': {
                  templateUrl: 'templates/root/mine.html',
                  controller: 'mineCtrl'
              }
          },
          cache: false
      });
  $urlRouterProvider.otherwise("/bikebon/home");
});