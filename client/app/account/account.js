'use strict';

angular.module('nss2016App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('preferences', {
        url: '/preferences',
        templateUrl: 'app/account/preferences/preferences.html',
        controller: 'PreferencesCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('forgotPassword', {
        url: '/forgotPassword',
        templateUrl: 'app/account/password/forgotPassword.html',
        controller: 'ForgotPasswordCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });