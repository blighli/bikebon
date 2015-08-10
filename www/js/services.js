var ionicSer = angular.module('starter.services',[]);

ionicSer.factory('$localStorage',['$window', function($window){
    return {
        set: function(key, value){
            $window.localStorage[key] = value;
        },
        get: function(key, defaultValue){
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function(key, value){
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function(key){
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}]);

ionicSer.factory('imgSer', ['$resource', 'baseUrl',
    function($resource, baseUrl){
        return $resource(baseUrl + '/imgs/homepage',
            {},{query: {method: 'GET', isArray:false}}
        );
}]);

ionicSer.factory('lenderSer', ['$resource', 'baseUrl', 'lender_id',
    function($resource, baseUrl, lender_id){
        return $resource(baseUrl + '/lender/:lender_id',
            {lender_id: lender_id}
        );
}]);

ionicSer.factory('bikeTypeSer', ['$resource', 'baseUrl', 'lender_id',
    function($resource, baseUrl, lender_id){
        return $resource(baseUrl + '/lender/:lender_id/biketype/:bike_type_id',
            {lender_id: lender_id, bike_type_id:'@bike_type_id'},
            {query: {method: 'GET', isArray: false}}
        );
}]);

ionicSer.factory('schedule',['$resource',
    function($resource){
        return $resource('');
}]);

























































