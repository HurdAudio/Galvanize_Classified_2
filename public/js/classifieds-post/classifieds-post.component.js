(function() {
  'use strict';

  angular.module('app')
    .component('classifiedsPost', {
      templateUrl: '/js/classifieds-post/classifieds-post.template.html',
      controller: controller
    });

  controller.$inject = ['$http', '$stateParams', '$state'];
  function controller($http, $stateParams, $state) {
    const vm = this;

    vm.$onInit = onInit;
    vm.updatePost = updatePost;
    vm.deletePost = deletePost;

    function onInit() {
      $http.get(`/classifieds/${$stateParams.id}`)
        .then(response => {
          vm.post = response.data;
        });
    }

    function updatePost() {
      $http.patch(`/classifieds/${$stateParams.id}`, vm.post)
        .then(response => {
            $state.go('home');
        });
    }

    function deletePost() {
      $http.delete(`/classifieds/${$stateParams.id}`)
        .then(response => {
            $state.go('home');
        });
    }
  }

}());
