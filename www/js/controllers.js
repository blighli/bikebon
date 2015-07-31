/**
 * Created by yxq on 15/7/23.
 */
var ionicCtrl = angular.module("starter.controllers",[]);
ionicCtrl.controller('imgCtrl',function($scope){
    $scope.imgs = [
        {
            "id": 1,
            "url": "img/rm/rm8.png",
            "title": "Bike One"
        },
        {
            "id": 2,
            "url": "img/rm/rm2.jpg",
            "title": "Bike Two"
        },
        {
            "id": 3,
            "url": "img/rm/rm6.jpg",
            "title": "Bike Three"
        }
    ];
});
ionicCtrl.controller('bikeCtrl',function($scope){
    $scope.bikes = [
        {
            "id": 1,
            "url": "img/bikes/bike3.jpg",
            "title": " 公路车",
            "surplus": 12,
            "total": 50,
            "href": "#"
        },
        {
            "id": 2,
            "url": "img/bikes/bike7.jpg",
            "title": "平板车",
            "surplus": 8,
            "total": 50,
            "href": "#"
        },
        {
            "id": 3,
            "url": "img/bikes/bike8.jpg",
            "title": "山地车",
            "surplus": 10,
            "total": 50,
            "href": "#"
        },
        {
            "id": 4,
            "url": "img/bikes/bike4.jpg",
            "title": "电动车",
            "surplus": 13,
            "total": 50,
            "href": "#"
        }
    ];
});
ionicCtrl.controller('successCtrl',function($scope){
     $scope.fails = [{
        "id": 1,
        "title": "身份认证",
        "img": "img/fail_Success/right.png",
        "description": "操作成功，系统会在一个工作日内审核"
    },{
        "id": 2,
        "title": "身份认证",
        "img": "img/fail_Success/wrong.png",
        "description": "信息填写错误，请重新提交"
    },{
        "id": 3,
        "title": "租用成功",
        "img": "img/fail_Success/right.png",
        "description": "订单已成功提交，请在30分钟内到租车点提车"
    },{
        "id": 4,
        "title": "租用失败",
        "img": "img/fail_Success/wrong.png",
        "description": "该车型已被抢光，请选其他车型"
    }];
});
ionicCtrl.controller('incomeCtrl',function($scope){
    $scope.expense = [{
        "id": 1,
        "name": "在线支付",
        "balance": "313.00",
        "date": "2015-07-25",
        "cost": "-76.00",
        "zero": false
    },{
        "id": 2,
        "name": "在线支付",
        "balance": "389.00",
        "date": "2015-07-23",
        "cost": "－11.00",
        "zero": false
    },{
        "id": 3,
        "name": "在线支付",
        "balance": "400.00",
        "date": "2015-07-25",
        "cost": "-100.50",
        "zero": false
    },{
        "id": 4,
        "name": "充值",
        "balance": "500.50",
        "date": "2015-07-25",
        "cost": "+60.00",
        "zero": true
    },{
        "id": 5,
        "name": "在线支付",
        "balance": "440.50",
        "date": "2015-07-25",
        "cost": "-15.00",
        "zero": false
    },{
        "id": 6,
        "name": "在线支付",
        "balance": "455.50",
        "date": "2015-07-14",
        "cost": "-15.50",
        "zero": false
    },{
        "id": 7,
        "name": "在线支付",
        "balance": "471.00",
        "date": "2015-07-13",
        "cost": "-29.00",
        "zero": false
    },{
        "id": 8,
        "name": "充值",
        "balance": "500.00",
        "date": "2015-07-9",
        "cost": "+500.00",
        "zero": true
    }];
});
ionicCtrl.controller('orderCtrl',function($scope){
    $scope.orders = [{
        id: 1,
        name: '公路车',
        img: 'img/bikes/bike1.jpg',
        cost: '0',
        time: '0',
        date: '2015-07-28',
        status: '订单审核中',
        delete: true,
        estimate: true
    }, {
        id: 2,
        name: '公路车',
        img: 'img/bikes/bike2.jpg',
        cost: '13.00',
        time: '30',
        date: '2015-07-27',
        status: '订单已完成',
        delete: true,
        estimate: true
    }, {
        id: 3,
        name: '公路车',
        img: 'img/bikes/bike3.jpg',
        cost: '0',
        time: '0',
        date: '2015-07-26',
        status: '订单已取消',
        delete: true,
        estimate: false
    },{
        id: 3,
        name: '公路车',
        img: 'img/bikes/bike3.jpg',
        cost: '0',
        time: '0',
        date: '2015-07-26',
        status: '订单已取消',
        delete: true,
        estimate: true
    }];
});