(function() {
  'use strict';

  angular.module('app')
    .component('classifiedsList', {
      require: {
        layout: '^app'
      },
      templateUrl: '/js/classifieds-list/classifieds-list.template.html',
      controller: controller
    });

  controller.$inject = ['$http'];
  function controller($http) {
    const vm = this;

    vm.$onInit = onInit;
    vm.createPost = createPost;

    function onInit() {
      $http.get('/classifieds')
        .then(response => vm.posts = response.data);
    }

    function createPost() {
      $http.post('/classifieds', vm.post)
        .then(response => {
          console.log("response", response.data);
          vm.post.push(response.data);
          delete vm.post;
        });
    }

  }

}());
