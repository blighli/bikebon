var ionicDir = angular.module("starter.directives",[]);
ionicDir.directive('hideTabs', function($rootScope){
   return {
       restrict: 'AE',
       link: function($scope){
           $rootScope.hideTabs = 'tabs-item-hide';
           $scope.$on('$destroy', function(){
               $rootScope.hideTabs = '';
           })
       }
   }
});
ionicDir.directive("appMap", function () {
    return {
        restrict: "E",
        replace: true,
        template: "<div id='allMap'></div>",
        scope: {
            center: "=",        // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=",       // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@",         // Map width in pixels.
            height: "@",        // Map height in pixels.
            zoom: "@",          // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            zoomControl: "@",   // Whether to show a zoom control on the map.
            scaleControl: "@",   // Whether to show scale control on the map.
            address:"@"
        },
        link: function (scope, element, attrs) {
            var map;
            // 百度地图API功能
            map = new BMap.Map("allMap");
            // 创建地址解析器实例
            var myGeo = new BMap.Geocoder();
            // 将地址解析结果显示在地图上,并调整地图视野
            myGeo.getPoint(scope.address, function(point){
                if (point) {
                    map.centerAndZoom(point, 16);
                    map.addOverlay(new BMap.Marker(point));
                }
            }, "宁波市");
        }
    };
});