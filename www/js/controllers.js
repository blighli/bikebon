var ionicCtrl = angular.module("starter.controllers",[]);

/**
 *  name：登录界面控制器（login.html）
 *  desc：
 *  author：yxq
 * */
ionicCtrl.controller('loginCtrl',['$scope', '$http', '$ionicPopup', '$timeout', '$localStorage', 'Base64', '$location', 'baseUrl', 'Push','$interval','$ionicHistory',
    function($scope, $http, $ionicPopup, $timeout, $localStorage, Base64, $location, baseUrl, Push,$interval,$ionicHistory){

        //获取验证码
        $scope.text = '获取密码';
        $scope.setDisabled = false;
        $scope.getCode = function(flag, phone){
            if(true == flag){
                $http.post(baseUrl + "/user/confirm_num",{"phone_number": phone});
                $scope.time = 59;
                $scope.text = $scope.time + '秒';
                $scope.setDisabled = true;

                var time = $interval(function(){
                    $scope.time--;
                    $scope.text = $scope.time + '秒';
                    if($scope.time == 0){
                        $interval.cancel(time);
                        $scope.setDisabled = false;
                        $scope.text = '重新发送';
                    }

                },1000);
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
                        Push.setAlias(phone);
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
ionicCtrl.controller('homeCtrl', ['$scope', 'imgSer', '$rootScope', '$http', 'baseUrl', '$cordovaBarcodeScanner', '$localStorage',
    'Base64', '$ionicPopup', '$timeout', '$location',
    function($scope, imgSer, $rootScope, $http, baseUrl, $cordovaBarcodeScanner, $localStorage, Base64, $ionicPopup, $timeout, $location){
        $rootScope.lender_id = 1;
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
        $scope.scans = function(){
            var temp = $localStorage.get("token");
            if(("" !== temp) && ("undefined" !== temp) && (undefined !== temp)){
                $cordovaBarcodeScanner
                    .scan()
                    .then(function(barcodeData){
                        var t = barcodeData.text;
                        if(("" !== t) && ("undefined" !== t) && (undefined !== t)){
                            var last = t.substring(t.lastIndexOf("/")+1, t.length);
                            $http.defaults.headers.post.Authorization = 'Basic ' + Base64.encode(temp + ': ');
                            $http.post(baseUrl + "/orders", {bike_name: last})
                                .success(function(data){
                                    var message = "";
                                    switch(data.status){
                                        case 200:
                                            alert("租用成功！");
                                            $location.path("/myTravel");
                                        case 5010:
                                            message = "对不起，您的余额不足！";
                                            break;
                                        case 5011:
                                            message = "对不起，该车还未入库！";
                                            break;
                                        case 5012:
                                            message = "对不起，该车已被租用！";
                                            break;
                                        case 5013:
                                            message = "对不起，该租车点未被您预约！";
                                            break;
                                        case 5014:
                                            message = "对不起，扫描的车型和预约的车型不符！";
                                            break;
                                        case 5015:
                                            message = "对不起，您还有未完成的订单！";
                                            break;
                                        case 5016:
                                            message = "对不起，您未被认证，请立即认证！";
                                            break;
                                        case 401:
                                            message = "对不起，请重新登录账号！";
                                            break;
                                        default:
                                            message = "对不起，这辆车无法被租用！";
                                            break;
                                    }
                                    if("" !== message){
                                        alert(message);
                                    }
                                })
                                .error(function(){
                                    console.log("Sorry, it has an error in homeCtrl.");
                                });
                        }else{
                            alert("对不起，请重新扫描您的二维码！");
                        }
                    }, function(error){
                        console.log("Sorry, it has an error in $cordovaBarcodeScanner.");
                    });
            }else{
                var myPopup = $ionicPopup.show({
                    title: "请登录后再进行租车！"
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        };
}]);

/**
 *  name：我的行程界面控制器（myTravel.html）
 *
 *  author：xk
 * */
ionicCtrl.controller('travelCtrl', ['$scope','$http','Base64','baseUrl','$localStorage',
    function($scope,$http,Base64,baseUrl,$localStorage){
        var temp = $localStorage.get('token');
        $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(temp + ': ');
        $http.get(baseUrl + "/currentjourney")
            .success(function(data,status){
                $scope.travelInfo = data;
            }).error(function(data,status){
            });

        setInterval(function(){
            $scope.$apply(function(){
                $http.get(baseUrl + "/currentjourney")
                    .success(function(data,status){
                        $scope.travelInfo = data;
                    }).error(function(data,status){
                    });
            });
        },60000);

    }]);

/**
 *  name：租车界面控制器（rentBike.html）
 *  desc：问题－租车点图片的加载(如主页)
 *  author：yxq
 * */
ionicCtrl.controller('rentBikeCtrl', ['$scope', 'lenderSer', 'bikeTypeSer', '$rootScope',
    function($scope, lenderSer, bikeTypeSer, $rootScope){
        //租车点信息的获取
        var lender_id = $rootScope.lender_id;

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
 *  desc：
 *  author：xk
 * */
ionicCtrl.controller('bikeDetailCtrl', ['$scope', '$stateParams', 'bikeTypeSer', '$rootScope', '$ionicPopup', '$timeout', '$location', 'getUserBikeInfoSer',
    '$http', 'baseUrl', 'Base64', '$localStorage',
    function($scope, $stateParams, bikeTypeSer, $rootScope, $ionicPopup, $timeout, $location, getUserBikeInfoSer, $http, baseUrl, Base64, $localStorage){
        var lender_id = $rootScope.lender_id;
        bikeTypeSer.get(
            {lender_id: lender_id, bike_type_id: $stateParams.bike_type_id},
            function(data){
                $scope.bike = data;
            });

        //判断用户当前能否租车以及预约车辆
        getUserBikeInfoSer.get()
            .success(function(data){
                $scope.userBikeInfo = data;
                if($scope.userBikeInfo.deposit < $scope.bike.bikeTypeBalance){
                    $scope.userBikeInfo.notRent = true;
                } else{
                    $scope.userBikeInfo.notRent = false;
                }
            }).error(function(){
            });

        var token = $localStorage.get('token');

        $scope.confirmRentBike = function() {
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>租车</strong>',
                template: '预约租车？',
                okText: '确定',
                cancelText: '取消'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(token + ': ');
                    $http.post(baseUrl + '/lender/' + lender_id + '/bike_type/' + $stateParams.bike_type_id + '/order_form')
                        .success(function(data,status){
                            $scope.orderId = data.orderId;

                            if(status == 200){
                                var myPopup = $ionicPopup.show({
                                    title: '预约成功'
                                });
                                $timeout(function () {
                                    myPopup.close();
                                    //预约成功后跳转到订单详情页面
                                    $location.path("/myOrder/" + $scope.orderId);
                                }, 2000);
                            }

                        }).error(function(data,status){

                            switch (status){
                                case 401:
                                    var myPopup = $ionicPopup.show({
                                        title: '您还未登录，请登录后再试'
                                    });
                                    $timeout(function () {
                                        myPopup.close();
                                        $location.path('/login');
                                    }, 2000);
                                    break;
                                case 5000:
                                    var myPopup = $ionicPopup.show({
                                        title: '您已有预约车辆'
                                    });
                                    $timeout(function () {
                                        myPopup.close();
                                    }, 2000);
                                    break;
                                case 5001:
                                    var myPopup = $ionicPopup.show({
                                        title: '您有已确认订单，若要重新预约，请取消此订单'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                    }, 2000);
                                    break;
                                case 5002:
                                    console.log(status);
                                    var myPopup = $ionicPopup.show({
                                        title: '您的余额不足，请及时充值!'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                    }, 2000);
                                    break;

                                case 5003:
                                    var myPopup = $ionicPopup.show({
                                        title: '您有进行中的订单，待订单完成后方可预约'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                    }, 2000);
                                    break;
                                case 5004:
                                    var myPopup = $ionicPopup.show({
                                        title: '您有未支付订单，若要预约请先完成支付'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                    }, 2000);
                                    break;
                                case 5005:
                                    var myPopup = $ionicPopup.show({
                                        title: '您还未认证，请先通过认证'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                        $location.path("/bikebon/mine");
                                    }, 2000);
                                    break;
                                case 5006:
                                    var myPopup = $ionicPopup.show({
                                        title: '认证尚未通过，请耐心等待'
                                    });

                                    $timeout(function () {
                                        myPopup.close();
                                        $location.path("/bikebon/mine");
                                    }, 2000);
                                    break;
                            }
                        });
                } else {
                    //取消
                }

            })
        }
}]);

/**
 * desc: 我的订单列表控制器
 * authorBy: xk
 * */
ionicCtrl.controller('OrderCtrl',['$scope','allOrderSer','payOrderSer','evaluateOrderSer','finishOrderSer','$localStorage','$ionicPopup',
    '$timeout','$http','Base64','baseUrl',
    function($scope, allOrderSer, payOrderSer, evaluateOrderSer,finishOrderSer,$localStorage,$ionicPopup,$timeout,$http,Base64,baseUrl) {
        //获取全部订单信息
        allOrderSer.get({},
            function(data) {
                $scope.order_list_all = data.orderList;
                if ($scope.order_list_all == '') {
                    //当前状态没有订单
                    $scope.order_list_all_status = false;
                } else {
                    //当前状态有订单
                    $scope.order_list_all_status = true;

                    for (var i = 0; i < $scope.order_list_all.length; i++) {
                        switch ( $scope.order_list_all[i].orderStatus ) {
                            case '0':
                                $scope.order_list_all[i].order_status = '已取消';
                                $scope.order_list_all[i].orderColor = "color: #B3B3B3";
                                $scope.order_list_all[i].orderShouldPayStatus = false;
                                break;
                            case '1':
                                $scope.order_list_all[i].order_status = '待审核';
                                $scope.order_list_all[i].orderColor = "color: #F6AC00";
                                $scope.order_list_all[i].orderShouldPayStatus = false;
                                $scope.order_list_all[i].cancelStatus = true;
                                //$scope.order_list_book_status = true;
                                break;
                            case '2':
                                $scope.order_list_all[i].order_status = '未付款';
                                $scope.order_list_all[i].orderColor = "color: #4B7CEA";
                                $scope.order_list_all[i].orderShouldPayStatus = true;
                                $scope.order_list_all[i].payStatus = true;
                                break;
                            case '3':
                                $scope.order_list_all[i].order_status = '未评价';
                                $scope.order_list_all[i].orderColor = "color: #90B821";
                                $scope.order_list_all[i].orderShouldPayStatus = true;
                                $scope.order_list_all[i].evaluateStatus = true;
                                break;
                            case '4':
                                $scope.order_list_all[i].order_status = '已评价';
                                $scope.order_list_all[i].orderColor = "color: #90B821";
                                $scope.order_list_all[i].orderShouldPayStatus = true;
                                $scope.order_list_all[i].checkStatus = true;
                                break;
                            case '5':
                                $scope.order_list_all[i].order_status = '已确认';
                                $scope.order_list_all[i].orderColor = "color: #F6AC00";
                                $scope.order_list_all[i].orderShouldPayStatus = false;
                                $scope.order_list_all[i].cancelStatus = true;
                                break;
                            case '6':
                                $scope.order_list_all[i].order_status = '进行中';
                                $scope.order_list_all[i].orderColor = "color: #FF5252";
                                $scope.order_list_all[i].orderShouldPayStatus = false;
                                break;
                        }
                    }
                }
            });

        //订单取消
        var token = $localStorage.get("token");
        //待审核订单，商家未确认，可取消
        $scope.cancelOrder = function (orderId) {
            var confirmPopup = $ionicPopup.confirm({
                title: '<strong>取消订单</strong>',
                template: '确定取消此订单？',
                okText: '确定',
                cancelText: '取消'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(token + ':');
                    $http.put(baseUrl + '/user/orders/' + orderId, {process_tag: 0}).
                        success(function (data, status, headers, config) {
                            var myPopup = $ionicPopup.show({
                                title: '订单已取消'
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        }).
                        error(function (data, status, headers, config) {
                            var myPopup = $ionicPopup.show({
                                title: '订单取消失败!'
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        });
                } else {
                    //取消
                }
            });
        };

        //获取待付款订单信息
        payOrderSer.get({},
            function(data) {
                $scope.order_list_pay = data.orderList;               //待付款

                if ($scope.order_list_pay == '') {
                    $scope.order_list_pay_status = false;
                } else {
                    $scope.order_list_pay_status = true;
                }
            });

        //获取待评价订单信息
        evaluateOrderSer.get({},
            function(data) {

                $scope.order_list_evaluate = data.orderList;               //待评价
                if ($scope.order_list_evaluate == '') {
                    $scope.order_list_evaluate_status = false;
                } else {
                    $scope.order_list_evaluate_status = true;
                }
            });

        //获取已完成订单信息
        finishOrderSer.get({},
            function(data) {
                $scope.order_list_finish = data.orderList;               //已完成
                if ($scope.order_list_finish == '') {
                    $scope.order_list_finish_status = false;
                } else {
                    $scope.order_list_finish_status = true;
                    for(var i=0; i<$scope.order_list_finish.length; i++){
                        switch($scope.order_list_finish[i].orderStatus){
                            case '3':
                                $scope.order_list_finish[i].order_status = '未评价';
                                $scope.order_list_finish[i].evaluateStatus = true;
                                break;
                            case '4':
                                $scope.order_list_finish[i].order_status = '已评价';
                                //$scope.order_list_finish[i].checkStatus = true;
                                break;
                        }
                    }
                }
            });
    }]);

/**
 * desc: 订单详细信息控制器（orderDetail.html）
 * authorBy: xk
 * */
ionicCtrl.controller('orderDetailCtrl',['$scope','orderDetailSer', '$stateParams',
    function($scope, orderDetailSer,$stateParams){
        orderDetailSer.get(
            {orderId: $stateParams.orderId},
            function(data){
                $scope.orderDetail = data;
               /* $scope.orderDetail.orderId = $stateParams.orderId;*/

                switch ($scope.orderDetail.order_status) {
                    case 0:   //已取消
                        $scope.orderDetail.cancelStatus = true;       //控制照片、取消时间的显示
                        $scope.orderDetail.calculateStatus = false;               //控制时长、费用的显示
                        $scope.orderDetail.payStatus = false;         //控制支付详情的显示
                        break;
                    case 1:   //待审核
                        $scope.orderDetail.checkingStatus = true;
                        $scope.orderDetail.calculateStatus = false;
                        $scope.orderDetail.payStatus = false;
                        break;
                    case 2:   //未付款
                        $scope.orderDetail.notPayStatus = true;
                        $scope.orderDetail.getBikeStatus = true;
                        $scope.orderDetail.returnBikeStatus = true;
                        $scope.orderDetail.calculateStatus = true;
                        $scope.orderDetail.payStatus = false;

                        break;
                    case 3:   //未评价
                        $scope.orderDetail.notEvaluateStatus = true;
                        $scope.orderDetail.getBikeStatus = true;
                        $scope.orderDetail.returnBikeStatus = true;
                        $scope.orderDetail.calculateStatus = true;
                        $scope.orderDetail.payStatus = true;

                        break;
                    case 4:   //已评价
                        $scope.orderDetail.Evaluated = true;
                        $scope.orderDetail.getBikeStatus = true;
                        $scope.orderDetail.returnBikeStatus = true;
                        $scope.orderDetail.calculateStatus = true;
                        $scope.orderDetail.payStatus = true;

                        break;
                    case 5:   //已预订
                        $scope.orderDetail.bookStatus = true;
                        $scope.orderDetail.calculateStatus = false;
                        $scope.orderDetail.payStatus = false;

                        break;
                    case 6:   //进行中
                        $scope.orderDetail.ingStatus = true;
                        $scope.orderDetail.getBikeStatus = true;
                        $scope.orderDetail.calculateStatus = false;
                        $scope.orderDetail.payStatus = false;
                        break;
                }
            }
        )
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

        //登录、身份认证模块
        if("undefined" !== temp && undefined !== temp){
            $scope.loginFlag = true;
            $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(temp + ': ');
            $http.get(baseUrl + '/user')
                .success(function(data){
                    var flag = data.verifyTag;
                    switch (flag){
                        case 1:
                            $scope.unauthenticated = true;
                            break;
                        case 2:
                            $scope.checking = true;
                            break;
                        case 3:
                            $scope.authenticated = true;
                            break;
                        case 4:
                            $scope.notCertified = true;
                            break;
                    }
                    $scope.userName = data.userName;
                    $scope.deposit = data.deposit;
                    $scope.baseTime = data.baseTime;
                    $scope.upscaleTime = data.upscaleTime;
                    $localStorage.set("sex", data.gender);
                    $localStorage.set("phoneID", data.ID);
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
        };
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
ionicCtrl.controller('settingCtrl', ['$scope', '$localStorage', '$location', '$ionicHistory',
    function($scope, $localStorage, $location, $ionicHistory){
        var temp = $localStorage.get("token");
        if("undefined" !== temp && undefined !== temp){
            $scope.exitFlag = true;
        }else{
            $scope.exitFlag = false;
        }
        $scope.exitBtn = function(){
            $ionicHistory.clearCache();
            $ionicHistory.clearHistory();
            $localStorage.clear();
            $location.path('/bikebon/mine');
        }
}]);

/**
 * name: 我的余额界面控制器（myBalance.html）
 * desc:
 * author: yxq
 * */
ionicCtrl.controller('balanceCtrl', ['$scope', 'mineSer', '$http', 'baseUrl',
    function($scope, mineSer, $http, baseUrl){
        $http.get(baseUrl + '/user')
            .success(function(data){
                $scope.local = data.deposit;
            }).error(function(){
                console.log("Sorry, it has an error in normalCtrl.");
            });
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
ionicCtrl.controller('normalCtrl', ['$scope', 'mineSer', '$http', 'baseUrl',
    function($scope, mineSer, $http, baseUrl){
        $http.get(baseUrl + '/user')
            .success(function(data){
                $scope.local = data.baseTime;
            }).error(function(){
                console.log("Sorry, it has an error in normalCtrl.");
            });
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
ionicCtrl.controller('advanceCtrl', ['$scope', 'mineSer', '$http', 'baseUrl',
    function($scope, mineSer, $http, baseUrl){
        $http.get(baseUrl + '/user')
            .success(function(data){
                $scope.local = data.upscaleTime;
            }).error(function(){
                console.log("Sorry, it has an error in advanceCtrl.");
            });
        mineSer.get(3)
            .success(function(data){
                $scope.data = data.bills;
            })
            .error(function(){
                console.log("Sorry, it has an error in advanceCtrl.");
            });
    }]);

/**
 *  name：个人信息界面控制器（mine/myInformation.html）
 *  desc：弹出拍照、从相册选择对话框
 *  author：wgj
 * */
ionicCtrl.controller("informationCtrl", ['$scope', '$ionicActionSheet', '$localStorage',
    function ($scope, $ionicActionSheet, $localStorage) {
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
        $scope.ID = $localStorage.get("phoneID");
        $scope.sex = $localStorage.get("sex");
}]);

/**
 *  name： 充值界面控制器（mine/myMoney.html）
 *  desc： 是mine/myBalanced.html页面的充值页面
 *  author：yxq
 * */
ionicCtrl.controller('myMoneyCtrl', ['$scope', 'paySer', '$location', '$http', 'baseUrl',
    function($scope, paySer, $location, $http, baseUrl){
        $scope.payMoney = function(){
            paySer.post("0", "0.01")
                .success(function(data){
                    var out_trade_no = data.out_trade_no;
                    window.alipay.payment(
                        {
                            "pay_info": data.string,
                            "sign": 1
                        },function(){
                            $http.post(baseUrl + '/payresult', {"out_trade_no": out_trade_no})
                                .success(function(data){
                                    if("True" === data.info)
                                    {
                                        $location.path("/getSuccess/1");
                                    }
                                })
                                .error(function(){
                                    $location.path("/getSuccess/0");
                                });
                        },function(){
                            $location.path("/getSuccess/0");
                        });
                }).error(function(){
                    $location.path("/getSuccess/0");
                });
        }
}]);

/**
 * name: 支付成功（失败）界面控制器（mine/getSuccess.html）
 * desc:
 * author: yxq
 */
ionicCtrl.controller('successCtrl', ['$scope', '$stateParams',
    function($scope, $stateParams){
        var flag = $stateParams.flag;
        if("1" == flag){
            $scope.success = true;
            $scope.words = "充值成功";
        }else{
            $scope.success = false;
            $scope.words = "充值失败";
        }
}]);

/**
 * name: 充值界面控制器（mine/money.html）
 * desc: 是mine/normalTime.html(advancedTime.html)页面的充值页面
 * author: yxq
 */
ionicCtrl.controller('moneyCtrl', ['$scope', 'paySer', '$stateParams',
    function($scope, paySer, $stateParams){
        var btn = $stateParams.btnId + "";
        var page = $stateParams.pageId + "";
        var temp = "1";
        if("1" == btn){
            $scope.words = "基础车型50小时（50元）";
        }else{
            $scope.words = "基础车型120小时（120元）";
        }
        switch(page + "" + btn){
            case "11":
                temp = "1";
                break;
            case "12":
                temp = "2";
                break;
            case "21":
                temp = "3";
                break;
            case "22":
                temp = "4";
                break;
        }
        $scope.payMoney = function(){
            paySer.post(temp, "0.01")
                .success(function(data){
                    window.alipay.payment(
                        {
                            "pay_info": data,
                            "sign": 1
                        },function(){
                            $location.path("/getSuccess/1");
                        },function(){
                            $location.path("/getSuccess/0");
                        });
                }).error(function(){
                    $location.path("/getSuccess/0");
                });
        }

}]);

/**
 * name: 性别修改页面控制器（mine/mySex.html）
 * desc: 性别修改保存
 * author: wgj
 */
ionicCtrl.controller('sexCtrl', ['$scope', '$http', 'baseUrl', '$localStorage', '$location',
    function ($scope, $http, baseUrl, $localStorage, $location) {
        $scope.sexList = [
            {text: "男"},
            {text: "女"}
        ];
        var temp = $localStorage.get("sex");
        if ("女" === temp) {
            $scope.flag = "女";
        } else {
            $scope.flag = "男";
        }
        $scope.saveSex = function () {
            if ("女" === $scope.flag) {
                //tag 为1表示改为男，2表示改为女
                //console.log("男");
                $http.post(baseUrl + '/user/info', {"tag": 1});
                $localStorage.set("sex", "男");
            } else {
                //console.log("女");
                $http.post(baseUrl + '/user/info', {"tag": 2});
                $localStorage.set("sex", "女");
            }
            $location.path('/bikebon/mine');
        }
    }]);

/**
 * name: 密码修改页面控制器（mine/mySecret.html）
 * desc: 修改密码
 * author: yxq
 */
ionicCtrl.controller('secretCtrl', ['$scope', '$location', '$http', 'baseUrl', '$ionicPopup', '$localStorage', 'Base64', '$timeout',
    function($scope, $location, $http, baseUrl, $ionicPopup, $localStorage, Base64, $timeout){
        $scope.saveSecret = function(pwd1, pwd2, pwd3)
        {
            if(pwd2 == pwd3){
                var temp = $localStorage.get("token");
                if("undefined" !== temp && undefined !== temp){
                    $http.defaults.headers.common.Authorization = 'Basic ' + Base64.encode(temp + ': ');
                    $http.post(baseUrl + "/user/password", {"old_password":pwd1, "new_password":pwd2})
                        .success(function(data, status){
                            if(200 == status){
                                var myPopup = $ionicPopup.show({
                                    title: "密码成功！"
                                });
                                $timeout(function () {
                                    myPopup.close();
                                }, 2000);
                                $location.path("/login");
                            }
                        })
                        .error(function(data, status){
                            var ts = "";
                            if(403 == status){
                                ts = "原密码错误，请重新输入！";
                            }else{
                                ts = "密码错误，请重新输入！";
                            }
                            var myPopup = $ionicPopup.show({
                                title: ts
                            });
                            $timeout(function () {
                                myPopup.close();
                            }, 2000);
                        });
                }
            }else{
                var myPopup = $ionicPopup.show({
                    title: "密码设置错误！"
                });
                $timeout(function () {
                    myPopup.close();
                }, 2000);
            }
        }
}]);