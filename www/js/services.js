var ionicSer = angular.module('starter.services',[]);

ionicSer.factory('imgSer', ['$resource', 'baseUrl', function($resource, baseUrl){
    return {};
}]);

ionicSer.factory('lenderSer', ['$resource', 'baseUrl', function($resource, baseUrl){
    return $resource(baseUrl + '/lender/:lender_id',
        {lender_id:'@lender_id'}
    );
}]);

ionicSer.factory('bikeTypeSer', ['$resource', 'baseUrl', function($resource, baseUrl){
    return $resource(baseUrl + '/lender/:lender_id/biketype/:bike_type_id',
        {lender_id: '@lender_id', bike_type_id:'@bike_type_id'},
        {query: {method: 'GET', isArray: false}}
    );
}]);

























































