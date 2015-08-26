var ionicCtrl = angular.module("starter.controllers",[]);

/**
 *  name：登录界面控制器（login.html）
 *  desc：
 *  author：yxq
 * */
ionicCtrl.controller('loginCtrl',['$scope', '$http', '$ionicPopup', '$timeout', '$localStorage', 'Base64', '$location', 'baseUrl',
    function($scope, $http, $ionicPopup, $timeout, $localStorage, Base64, $location, baseUrl){
        //获取验证码
        $scope.getCode = function(flag, phone){
            if(true == flag){
                $http.post(baseUrl + "/user/confirm_num",{"phone_number": phone});
            }else{
                var myPopup = $ionicPopup.show({title: '手机号码输入有误,请重新输入～'});
                $timeout(function(){
                    myPopup.close();
                }, 2500);
            }
        };
        //验证用户是否登录[通过获取token服务判断登录是否成功，并把token存到localStorage上]
        $scope.login = function(flag, phone, pwd){
            if(true == flag){
                $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(phone + ':' + pwd);
                $http.get(baseUrl + '/get_token')
                    .success(function(data){
                        $localStorage.set("token", data.token);
                        $location.path('/bikebon/mine');
                    }).error(function(){
                        var p = $ionicPopup.show({title: '登录失败，请重新登录！'});
                        $timeout(function(){
                            p.close();
                        }, 2500);
                    });
            }else{
                var myPopup = $ionicPopup.show({title: '密码不正确，请重新输入～'});
                $timeout(function(){
                   myPopup.close();
                }, 2500);
            }
        };
        //取消登录
        $scope.cancelLogin = function(){
            $location.path('/bikebon/mine');
        }
}]);

/**
 *  name：主页界面控制器（home.html）
 *  desc：轮播图的加载（但是图片加载后，CSS样式无法适用）
 *  author：yxq
 * */
ionicCtrl.controller('homeCtrl', ['$scope', 'imgSer',
    function($scope, imgSer){
/*        $scope.imgs = [
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
        ];*/
       imgSer.query({}, function(data){
           $scope.imgs = data.imgs;
        });
}]);

/**
 *  name：租车界面控制器（rentBike.html）
 *  desc：问题－租车点图片的加载(如主页)
 *  author：yxq
 * */
ionicCtrl.controller('rentBikeCtrl', ['$scope', 'lenderSer', 'bikeTypeSer', '$localStorage',
    function($scope, lenderSer, bikeTypeSer, $localStorage){
        //租车点信息的获取
        var lender_id = $localStorage.get("lender_id");
        lenderSer.get({lender_id: lender_id}, function(data){
            $scope.rentStop = data;
        });
        //车信息的获取
        bikeTypeSer.query({}, function(data){
            $scope.bikes = data.types;
        });
}]);

/**
 *  name：租车详情界面控制器（main/bikeDetail.html）
 *  desc：问题－页面标题的显示(待完善)
 *  author：yxq
 * */
ionicCtrl.controller('bikeDetailCtrl', ['$scope', '$stateParams', 'bikeTypeSer',
    function($scope, $stateParams, bikeTypeSer){
        bikeTypeSer.get(
            {bike_type_id: $stateParams.bike_type_id},
            function(data){
                $scope.bike = data;
        });
}]);

/**
 *  name：我的界面控制器（mine.html）
 *  desc：
 *  author：yxq
 * */
ionicCtrl.controller('mineCtrl', ['$localStorage', '$scope', '$http', 'Base64', 'baseUrl',
    function($localStorage, $scope, $http, Base64, baseUrl){
        var temp = $localStorage.get("token");
        $scope.loginFlag = false;
        $scope.user = {
            "baseTime": " ",
            "deposit": " ",
            "gender": " ",
            "portraitUrl": "",
            "school": "",
            "upscaleTime": " ",
            "userName": " ",
            "verifyTag": false
        };
        if("undefined" !== temp && undefined !== temp){
            $scope.loginFlag = true;
            $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(temp + ': ');
            $http.get(baseUrl + '/user')
                .success(function(data){
                    $scope.user = data;
                    var flag = data.verifyTag;
                    if(flag === true){
                        $scope.verifyFlag = true;
                        $scope.verifyMess = "已认证用户";
                    }else{
                        $scope.verifyFlag = false;
                        $scope.verifyMess = "认证审核中";
                    }
                }).error(function(){
                    console.log("Sorry, it has an error in mineCtrl.");
                });
        }else{
            console.log("I am in false loginFlag.");
        }
}]);

/**
 *  name：身份认证界面控制器（mine/identity.html）
 *  desc：
 *  author：yxq
 * */
ionicCtrl.controller('identityCtrl', ['$scope', '$ionicActionSheet', 'lenderSer',
    function($scope, $ionicActionSheet, lenderSer){
        //获取租车点列表
        lenderSer.query({}, function(data){
            $scope.lenders = data.lender_lists;
        });
        //实现了ActionSheet的弹出（ios取消键的取消功能，android无取消键）
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



/**
 *  name：所有成功失败提示界面控制器（mine/failOrSuccess.html）
 *  desc：自己的观点－服务器端只需要返回成功或失败的标记，description要重新写
 *  author：yxq
 * */
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