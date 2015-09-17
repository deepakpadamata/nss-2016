'use strict';

angular.module('nss2016App')
  .controller('PreferencesCtrl', function ($scope, Auth, $http) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.user = Auth.getCurrentUser();
    $scope.projects = 
    $http.get('api/projects')
    .success(function (data) {
    	console.log(data);
    	$scope.projects = data;
    })
    $scope.alerts = [
    	false,
    	false,
    	false,
    	false,
    	false
    ]
    $scope.skillset=[];
    $scope.skills = ['English speaking,',
		'English Writing',
		'Enginnering student',
		'Basic computer skills',
		'Malyalam speaking',
		'Tamil speaking',
		'Malyalam writing',
		'Marathi writing',
		'Tamil writing',
		'Hindi writing',
		'Animal love',
		'Telugu writing,',
		'Marathi writing,',
		'Gujrati writing,',
		'Bengali writin',
		'Strong communication skills'];
    $scope.goodData = true;
	$scope.submit = function (form) {
		$scope.user.skills = [];
		$scope.alerts = [
	    	false,
	    	false,
	    	false,
	    	false,
	    	false
	    ];
		for (var i = $scope.skillset.length - 1; i >= 0; i--) {
			if ($scope.skillset[i] == true){
				$scope.user.skills.push($scope.skills[i]);
			}
		};
		$scope.goodData = true;
		for (var i = 4; i >= 0; i--) {
			for (var j = i-1; j >= 0; j--) {
				if($scope.user.preferences[i] == $scope.user.preferences[j]){
					$scope.alerts[i] = true;
					$scope.alerts[j] = true;
					$scope.goodData = false;
				}
			};
		};
		if($scope.goodData == true){
			$http.post('api/users/editProfile', $scope.user)
			.success(function (data) {
		    	console.log(data);
		    	alert("Successfully registered!")
			})
		}
	}
  });
