var ionicFil = angular.module('starter.filters',[]);
ionicFil.filter('roundNum', function(){
    var roundNumFilter = function(input){
        var nums = input.split('.');
        console.log(nums[0]);
        return nums[0];
    }
    return roundNumFilter;
});
