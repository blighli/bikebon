var ionicCtrl = angular.module("starter.controllers",[]);

ionicCtrl.controller('loginCtrl',['$scope', '$http', function($scope, $http){
    console.log("Come in loginCtrl");
    $scope.getCode = function(phoneNum){
        console.log("phoneNum:" + phoneNum);
        $http.post("http://bike.liqilei.com:2444/api/v1.0/user/confirm_num",{"phone_number": phoneNum});
    }
}]);

ionicCtrl.controller('homeCtrl', ['$scope', 'imgSer',
    function($scope, imgSer){
        $scope.imgs = [
            {
                "imgLink": "",
                "imgUrl": "img/home/home_pic1.jpg",
                "imgTitle": "Bike One"
            },
            {
                "imgLink": 2,
                "imgUrl": "img/home/home_pic2.jpg",
                "imgTitle": "Bike Two"
            },
            {
                "imgLink": 3,
                "imgUrl": "img/home/home_pic3.jpg",
                "imgTitle": "Bike Three"
            }
        ];
       /* imgSer.query({}, function(data){
           $scope.imgs = data.imgs;
        });*/
}]);

ionicCtrl.controller('rentBikeCtrl', ['$scope', 'lenderSer', 'bikeTypeSer',
    function($scope, lenderSer, bikeTypeSer){
        lenderSer.get({}, function(data){
            $scope.rentStop = data;
        });
        bikeTypeSer.query({}, function(data){
            $scope.bikes = data.types;
        });
}]);

ionicCtrl.controller('bikeDetailCtrl', ['$scope', '$stateParams', 'bikeTypeSer',
    function($scope, $stateParams, bikeTypeSer){
        bikeTypeSer.get(
            {bike_type_id: $stateParams.bike_type_id},
            function(data){
                $scope.bike = data;
        });
}]);

ionicCtrl.controller('identityCtrl', ['$scope', '$ionicActionSheet',
    function($scope, $ionicActionSheet){
        $scope.show = function(){
           var hideSheet = $ionicActionSheet.show({
               buttons: [
                   {text: '拍照'},
                   {text: '从相册选择'}
               ],
               cancelText: '取消',
               cssClass: 'ios-actionSheet',
               cancel: function(){
                   hideSheet();
               },
               buttonClicked: function(index){
                   return true;
               }
           });
        }
    }
]);

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