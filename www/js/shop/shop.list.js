(function () {
  'use strict';

  angular
    .module('shop.list', [])
    .controller('ShopListCtrl', ShopListCtrl);

  ShopListCtrl.$inject = ['$scope', '$state', 'Shop'];

  /* @ngInject */
  function ShopListCtrl($scope, $state, Shop) {
    $scope.init = init;
    $scope.shops = null;

    init();

    ////////////////

    function init() {
      var cateogyrId = $state.params.categoryId;
      query(cateogyrId);
    }

    function query(categoryId) {
      D('Shop')
        .where({categoryId: categoryId})
        .select()
        .then(function(shops) {
          $scope.shops = shops;
          for (var i = 0; i < shops.length; i++) {
            var shop = $scope.shops[i];
            var id = shop.id;
            var _i = i;
            D('Item')
              .where({shopId: id})
              .select()
              .then(function(items) {
                $scope.shops[_i].items = items;
                $scope.$digest();
              })
          }
        })
    }
  }
})();
