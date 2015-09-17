'use strict';

angular.module('nss2016App')
  .controller('ResetPasswordCtrl', function ($scope, $http, $stateParams, $window, $location) {
    $scope.message = '';
    $scope.newPassword = '';
    $scope.confirmNewPassword = '';
    $scope.submitted = false;

    $scope.reset = function() {
        $scope.submitted = true;
        $scope.message = 'Working...'

        $http.post('/api/users/resetPassword/' + $stateParams.token, { newPassword: $scope.newPassword })
        .success(function (message) {
            $scope.message = '';
            $window.alert('Successfully changed');
            $location.url('/login');
        })
        .error(function (message) {
            $scope.message = 'Your token has been expired (or) is invalid'
            $scope.newPassword = '';
            $scope.confirmNewPassword = '';
        });
    };
  });
