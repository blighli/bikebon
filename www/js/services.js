var ionicSer = angular.module('starter.services',[]);

/**
 *  name：获取图片信息服务(REST)
 *  desc：首页轮播图
 *  author：yxq
 * */
ionicSer.factory('imgSer', ['$resource', 'baseUrl',
    function($resource, baseUrl){
        return $resource(baseUrl + '/imgs/homepage',
            {},{query: {method: 'GET', isArray:false}}
        );
}]);

/**
 *  name：获取租车点信息服务(REST)
 *  desc：
 *  author：yxq
 * */
ionicSer.factory('lenderSer', ['$resource', 'baseUrl',
    function($resource, baseUrl){
        return $resource(baseUrl + '/lenders/:lender_id',
            {lender_id: '@lender_id'},
            {query: {method: 'GET', isArray: false}}
        );
}]);

/**
 *  name：获取车的信息服务(REST)
 *  desc：包括所有车子及某一种车的信息
 *  author：yxq
 * */
ionicSer.factory('bikeTypeSer', ['$resource', 'baseUrl',
    function($resource, baseUrl){
        return $resource(baseUrl + '/lender/:lender_id/biketype/:bike_type_id',
            {lender_id: '@lender_id', bike_type_id:'@bike_type_id'},
            {query: {method: 'GET', isArray: false}}
        );
}]);

/**
 *  name：有localStorage相关的服务
 *  desc：本地数据的存储删除［附加JSON格式］
 *  author：yxq
 * */
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
        },
        remove: function(key){
            $window.localStorage.removeItem(key);
        }
    }
}]);

/**
 *  name：Base64编码服务
 *  desc：从网上直接copy来的
 *  author：yxq
 * */
ionicSer.factory('Base64', function() {
    var keyStr = 'ABCDEFGHIJKLMNOP' +
        'QRSTUVWXYZabcdef' +
        'ghijklmnopqrstuv' +
        'wxyz0123456789+/' +
        '=';
    return {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };
});

























































