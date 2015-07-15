(function () {
  'use strict';

  angular
    .module('gps.list', [])
    .controller('GPSListCtrl', GPSListCtrl);

  GPSListCtrl.$inject = ['$scope', '$location', '$anchorScroll', 'GPS'];

  /* @ngInject */
  function GPSListCtrl($scope, $location, $anchorScroll, GPS) {
    $scope.init = init;
    $scope.data = {
      city: ''
    };
    $scope.goto = goto;

    $scope.cityList = GPS.cityList;
    $scope.city = GPS.city;
    $scope.setCity = GPS.setCity;
    $scope.setCurrentCity = setCurrentCity;
    $scope.search = search;
    $scope.isSearch = false;

    init();

    ////////////////

    function init() {
      GPS.currentCity(function(res) {
        $scope.currentCity = res.result.addressComponent.city;
      });
    }

    function goto(id) {
      $location.hash(id);
      $anchorScroll();
    }

    function setCurrentCity() {
      GPS.setCity($scope.currentCity || '厦门');
    }

    function search() {
      $scope.isSearch = true;
    }
  }
})();
