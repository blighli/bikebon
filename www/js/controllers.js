var ionicCtrl = angular.module("starter.controllers",[]);

ionicCtrl.controller('loginCtrl',['$scope', '$http', '$ionicPopup', '$timeout', '$localStorage', 'Base64', '$location',
    function($scope, $http, $ionicPopup, $timeout, $localStorage, Base64, $location){
        $scope.getCode = function(flag, phone){
            if(true == flag){
                $http.post("http://bike.liqilei.com:2444/api/v1.0/user/confirm_num",{"phone_number": phone});
            }else{
                var myPopup = $ionicPopup.show({title: '手机号码输入有误,请重新输入～'});
                $timeout(function(){
                    myPopup.close();
                }, 2500);
            }
        };
        $scope.login = function(flag, phone, pwd){
            if(true == flag){
                $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(phone + ':' + pwd);
                $http.get('http://bike.liqilei.com:2444/api/v1.0/user').success(function(){
                    $http.get('http://bike.liqilei.com:2444/api/v1.0/get_token')
                        .success(function(data){
                            $localStorage.set("token", data.token);
                            $localStorage.set("loginFlag", true);
                            console.log("loginFlag-ls:" + $localStorage.get("loginFlag") + "verifyFlag-ls:" + $localStorage.get("verifyFlag"));
                            $location.path('/bikebon/mine');
                        }).error(function(){
                            var p = $ionicPopup.show({title: '登录失败，请重新登录！'});
                            $timeout(function(){
                                p.close();
                            }, 2500);
                        });
                }).error(function(){
                    var popup = $ionicPopup.show({title: '登录失败，请重新登录～'});
                    $timeout(function(){
                        popup.close();
                    }, 2500);
                });
            }else{
                var myPopup = $ionicPopup.show({title: '密码不正确，请重新输入～'});
                $timeout(function(){
                   myPopup.close();
                }, 2500);
            }
        };
        $scope.cancelLogin = function(){
            $location.path('/bikebon/mine');
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

ionicCtrl.controller('mineCtrl', ['$scope', '$localStorage', function($scope, $localStorage){
    $scope.loginFlag = ($localStorage.get("loginFlag") === "true");
    $scope.verifyFlag = ($localStorage.get("verifyFlag") === "true");
    console.log("loginFlag(ls):" + $localStorage.get("loginFlag") + "verifyFlag(ls):" + $localStorage.get("verifyFlag"));
    console.log("loginFlag:" + $scope.loginFlag + "verifyFlag:" + $scope.verifyFlag);
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
                    if(index == 0){
                        console.log("拍照");
                    }
                    if(index == 1){
                        console.log("从相册选择");
                    }
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