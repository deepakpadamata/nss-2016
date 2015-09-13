'use strict';

angular.module('nss2016App')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.user = {
      confirm: false
    };
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;
      console.log("yo");
      if(form.$valid) {
        if($scope.user.confirm != true){
          alert("You cannot apply for projects without confirming your membership. Please apply when you have decided for sure" );
        }
        else{
          Auth.createUser({
            name: $scope.user.name,
            rollNumber: $scope.user.rollNumber,
            phoneNumber: $scope.user.phoneNumber,
            email: $scope.user.email,
            password: $scope.user.password
          })
          .then( function(data) {
            // $location.path('/');
            console.log(data);
          })
          .catch( function(err) {
            err = err.data;
            $scope.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
              alert(error.message);
            });
          });
          }
      }
    };

  });
