'use strict';

angular.module('nss2016App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'app/preferences/preferences.html',
        controller: 'PreferencesCtrl'
      });
  });