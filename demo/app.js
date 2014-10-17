angular.module('FbTest', ['ngRoute'])

// Config
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/demo', {
			templateUrl: '/demo/views/home.html',
			controller: 'HomeController'
			
		})
		.when('/friends', {
			templateUrl: '/demo/views/friends.html',
			controller: 'FriendsController'
		});

	$locationProvider.html5Mode(true);
	
}])

// Service
.factory('FbService', ['$rootScope', function($rootScope){

	var Facebook = {};

	Facebook.isLogged = false;

	Facebook.getFriends = function(resp) {

		FB.api('/me/friends?fields=name,picture.height(280).width(280)', function(response) {
			$rootScope.$apply(function() {
			   resp(response.data);
			});
		});
	}

	return Facebook;

}])

// Controllers
.controller('HomeController', ['$scope', '$rootScope', 'FbService', '$route', '$routeParams', '$location', function($scope, $rootScope, FbService, $route, $routeParams, $location){

	$scope.isLogged = FbService.isLogged;

	$scope.login = function() {

		FB.login(function(response) {
			$rootScope.$apply(function() {
			if (response.authResponse) {
				FbService.isLogged = true;
				$location.path('/friends');
        	}
        	});

		});
	}

}])

.controller('FriendsController', ['$scope', '$rootScope', 'FbService', function($scope, $rootScope, FbService){

	FbService.getFriends(function(resp) {
		$scope.friends = resp;
	});

}])


// Facebook SDK Initialization
window.fbAsyncInit = function() {
	FB.init({
		appId: '488181561252340', // App ID
		channelUrl: 'https://socialike.herokuapp.com/home.html', // Channel File
		status: true, // check login status
		cookie: true, // enable cookies to allow the server to access the session
		xfbml: false // parse XFBML

	});

	// Bootstrap app
	angular.bootstrap(document.body, ['FbTest']);
};

// Load the SDK asynchronously
(function (d) {
   var js, id = 'facebook-jssdk',
      ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {
      return;
   }
   js = d.createElement('script');
   js.id = id;
   js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));