var ionicFil = angular.module('starter.filters',[]);
ionicFil.filter('roundNum', function(){
    var roundNumFilter = function(input){
        var nums = input.split('.');
        return nums[0];
    };
    return roundNumFilter;
});
ionicFil.filter('plusFlag', function(){
    var plusFlagFilter = function(input){
      var first = input.substr(0, 1);
      if('-' == first){
          return true;
      }else{
          return false;
      }
    };
    return plusFlagFilter;
});
ionicFil.filter('limitNum', function(){
    var limitNumFilter = function(input){
        if(input.length > 8){
            input = input.substr(0, 9) + '...';
        }
        return input;
    };
    return limitNumFilter;
});