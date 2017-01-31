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

  controller.$inject = ['$http', '$state', '$stateParams'];
  function controller($http, $state, $stateParams) {
    const vm = this;

    vm.$onInit = onInit;
    vm.createPost = createPost;
    vm.editPost = editPost;
    vm.sortBy = '-date';
    vm.updateSort = updateSort;

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

    function editPost(id) {
      console.log(id);
      $http.get(`/classifieds/${id}`)
      .then(response => {
        $state.go('classifiedsPost', {id: response.data.id});
      });

    }

    function updateSort(sortedBy) {
      vm.sortBy = sortedBy;
    }



  }

}());
