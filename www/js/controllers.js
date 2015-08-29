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
/*       imgSer.query({}, function(data){
           $scope.imgs = data.imgs;
        });*/
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
        bikeTypeSer.query({lender_id: lender_id}, function(data){
            $scope.bikes = data.types;
        });
}]);

/**
 *  name：租车详情界面控制器（main/bikeDetail.html）
 *  desc：问题－页面标题的显示(待完善)
 *  author：yxq
 * */
ionicCtrl.controller('bikeDetailCtrl', ['$scope', '$stateParams', 'bikeTypeSer', '$localStorage',
    function($scope, $stateParams, bikeTypeSer, $localStorage){
        var lender_id = $localStorage.get("lender_id");
        bikeTypeSer.get(
            {lender_id: lender_id, bike_type_id: $stateParams.bike_type_id},
            function(data){
                $scope.bike = data;
        });
}]);

/**
 *  name：我的界面控制器（mine.html）
 *  desc：
 *  author：yxq
 * */
ionicCtrl.controller('mineCtrl', ['$localStorage', '$scope', '$http', 'Base64', 'baseUrl', '$location',
    function($localStorage, $scope, $http, Base64, baseUrl, $location){
        //我的页面数据初始化[登录认证标记]
        var temp = $localStorage.get("token");
        $scope.loginFlag = false;
        $scope.verifyFlag = false;
        //登录、身份认证模块
        if("undefined" !== temp && undefined !== temp){
            $scope.loginFlag = true;
            $scope.userName = $localStorage.get("userName");
            $scope.deposit = $localStorage.get("remainder");
            $scope.baseTime = $localStorage.get("normalTime");
            $scope.upscaleTime = $localStorage.get("superTime");
            $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(temp + ': ');
            $http.get(baseUrl + '/user')
                .success(function(data){
                    var flag = data.verifyTag;
                    if(flag === true){
                        $scope.verifyFlag = true;
                        $scope.verifyMess = "已认证用户";
                    }else{
                        $scope.verifyFlag = false;
                        $scope.verifyMess = "认证审核中";
                    }
                    $localStorage.set("userName", data.userName);
                    $scope.userName = data.userName;
                    $localStorage.set("remainder", data.deposit);
                    $scope.deposit = data.deposit;
                    $localStorage.set("normalTime", data.baseTime);
                    $scope.baseTime = data.baseTime;
                    $localStorage.set("superTime", data.upscaleTime);
                    $scope.upscaleTime = data.upscaleTime;
                }).error(function(){
                    console.log("Sorry, it has an error in mineCtrl.");
                });
        }
        //我的券
        $scope.couponFun = function(){
            if("undefined" !== temp && undefined !== temp){
                $location.path("/myCoupon");
            }else{
                $location.path("/login");
            }
        }
        //我的订单
        $scope.orderFun = function(){
            if("undefined" !== temp && undefined !== temp){
                $location.path("/myOrder");
            }else{
                $location.path("/login");
            }
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
                    if(0 == index){
                        console.log("拍照");
                    }else if(1 == index){
                        console.log("从相册选择");
                    }else{
                    	console.log("点错啦～");
                    }
                    return true;
                }
            });
        }
    }
]);

/**
 * name: 设置页面控制器（settings.html）
 * desc: 账号注销功能的实现［清除缓存／跳转到我的页面］
 * author: yxq
 * */
ionicCtrl.controller('settingCtrl', ['$scope', '$localStorage', '$location',
    function($scope, $localStorage, $location){
        var temp = $localStorage.get("token");
        if("undefined" !== temp && undefined !== temp){
            $scope.exitFlag = true;
        }else{
            $scope.exitFlag = false;
        }
        $scope.exitBtn = function(){
            $localStorage.delete("token");
            $location.path('/bikebon/mine');
        }
}]);

/**
 * name: 我的余额界面控制器（myBalance.html）
 * desc:
 * author: yxq
 * */
ionicCtrl.controller('balanceCtrl', ['$scope', 'mineSer',
    function($scope, mineSer){
        mineSer.get(1)
            .success(function(data){
                $scope.data = data.bills;
            })
            .error(function(){
                console.log("Sorry, it has an error in balanceCtrl.");
            });
}]);

/**
 * name: 我的余额界面控制器（myBalance.html）
 * desc:
 * author: yxq
 * */
ionicCtrl.controller('balanceCtrl', ['$scope', 'mineSer', '$localStorage',
    function($scope, mineSer, $localStorage){
        $scope.local = $localStorage.get("remainder");
        mineSer.get(1)
            .success(function(data){
                $scope.data = data.bills;
            })
            .error(function(){
                console.log("Sorry, it has an error in balanceCtrl.");
            });
    }]);

/**
 * name: 普通时间界面控制器（normalTime.html）
 * desc:
 * author: yxq
 * */
ionicCtrl.controller('normalCtrl', ['$scope', 'mineSer', '$localStorage',
    function($scope, mineSer, $localStorage){
        $scope.local = $localStorage.get("normalTime");
        mineSer.get(2)
            .success(function(data){
                $scope.data = data.bills;
            })
            .error(function(){
                console.log("Sorry, it has an error in normalCtrl.");
            });
    }]);

/**
 * name: 高级时间界面控制器（advancedTime.html）
 * desc:
 * author: yxq
 * */
ionicCtrl.controller('advanceCtrl', ['$scope', 'mineSer', '$localStorage',
    function($scope, mineSer, $localStorage){
        $scope.local = $localStorage.get("superTime");
        mineSer.get(3)
            .success(function(data){
                $scope.data = data.bills;
            })
            .error(function(){
                console.log("Sorry, it has an error in advanceCtrl.");
            });
    }]);

/**
 *  name：个人信息界面头像上拉菜单的实现（mine/myInformation.html）
 *  desc：自己写
 *  author：wgj
 * */
//ionicCtrl.controller("informationCtrl",function($scope, $ionicActionSheet, $timeout) {
//
//    // Triggered on a button click, or some other target
//    $scope.show = function() {
//
//        // Show the action sheet
//        var hideSheet = $ionicActionSheet.show({
//            buttons: [
//                { text: "拍摄" }
//            ],
//            buttonClicked: function(index) {
//                return true;
//            },
//            cancelText: "取消",
//            cancel: function() {
//                // add cancel code..
//            },
//            destructiveText: "从相册选择",
//            destructiveButtonClicked:function(){
//            }
//        });
//
//        // For example's sake, hide the sheet after two seconds
//        $timeout(function() {
//            //	hideSheet();
//        }, 2000);
//
//    };
//});

