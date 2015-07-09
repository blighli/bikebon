var ionicCtrl = angular.module("starter.controllers",[]);

ionicCtrl.controller('imgCtrl',function($scope){
    $scope.imgs = [
        {
            "id": 1,
            "url": "img/rm8.png",
            "title": "Bike One"
        },
        {
            "id": 2,
            "url": "img/rm2.jpg",
            "title": "Bike Two"
        },
        {
            "id": 3,
            "url": "img/rm6.jpg",
            "title": "Bike Three"
        }
    ];
});

ionicCtrl.controller('bikeListCtrl',function($scope){
    $scope.bikes = {
        "bikes": [
            {
                "description": "运动型，体验飞一般的速度",
                "href": "#/bike/bikeList/:1",
                "id": 1,
                "img": "img/glbike.jpg",
                "title": "公路车"
            },
            {
                "description": "越野型，翻山越岭的不二之选",
                "href": "#",
                "id": 2,
                "img": "img/sdbike.jpg",
                "title": "山地车"
            },
            {
                "description": "普通型，省时省力的好伙伴",
                "href": "#",
                "id": 3,
                "img": "img/elbike.jpg",
                "title": "电动车"
            },
            {
                "description": "潮流型，绿色环保的交通工具",
                "href": "#",
                "id": 4,
                "img": "img/phbike.jpg",
                "title": "平衡车"
            }

        ]
    }
});
ionicCtrl.controller('activityListCtrl',function($scope){
    $scope.activityList = {
        "activity": [
            {
                "description": "哈哈~我和我的车~",
                "href": "#",
                "id": 1,
                "img": "img/rm3.jpg",
                "user": "最讨厌想昵称"
            },
            {
                "description": "最浪漫的事情---骑行",
                "href": "#",
                "id": 2,
                "img": "img/rm5.jpg",
                "user": "Anglet"
            },
            {
                "description": "我的车技棒棒哒！",
                "href": "#",
                "id": 3,
                "img": "img/rm7.jpg",
                "user": "lxl"
            },
            {
                "description": "哥骑得是人生~",
                "href": "#",
                "id": 4,
                "img": "img/rm9.jpg",
                "user": "三藏"
            }
        ]
    }
});

ionicCtrl.controller('picListCtrl',function($scope){
    $scope.picList = {
        "pic": [
            {
                "id": 1,
                "img": "img/rm1.jpg"
            },
            {
                "id": 2,
                "img": "img/rm9.jpg"
            },
            {
                "id": 3,
                "img": "img/rm4.jpg"
            }
        ]
    }
});

ionicCtrl.controller('mapListCtrl',function($scope){
    $scope.payData = {
        "pay": [
            {
                "deposit": 100,
                "rent": 50,
                "maxPay": 100
            }
        ]
    }
});

ionicCtrl.controller('mapListCtrl',function($scope){
    $scope.payData = {
        "pay": [
            {
                "deposit": 100,
                "rent": 50,
                "maxPay": 100
            }
        ]
    }
});

ionicCtrl.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div id='appMap'></div>",
        scope: {
            center: "=",		// Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@",		 // Map width in pixels.
            height: "@",		// Map height in pixels.
            zoom: "@",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@",   // Whether to show scale control on the map.
            address:"@"
        },
        link: function (scope, element, attrs) {
            var map;
            map = new BMap.Map("appMap");
            map.centerAndZoom(new BMap.Point(113.402364,23.056676), 16);
        }
    };
});