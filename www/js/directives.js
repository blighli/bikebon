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