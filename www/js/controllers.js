var serverUrl = 'http://localhost/github/myigniter/index.php/api';
//var serverUrl = 'http://myigniter.esy.es/index.php/api';

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  
})

.controller('GetAllCtrl', function($scope, $http){
  function getAll(){
    $http.get(serverUrl + '/user').
      success(function(user){
        $scope.users = user;
        $scope.$broadcast('scroll.refreshComplete');
      });
  }

  getAll();

  $scope.refreshGet = function(){
    getAll();
  };
})


.controller('PostCtrl', function($scope, $http){
  $scope.post = function() {
    var postData = {
      name: $scope.post.nama,
      email: $scope.post.email
    };

    $http.post(serverUrl + '/user', postData).
      success(function(data) {
        console.log(data);
      });

    $scope.post.nama = '';
    $scope.post.email = '';
  };
})

.controller('GetCtrl', function($scope, $http, $stateParams, $ionicHistory){
  $http.get(serverUrl + '/user/id/' + $stateParams.getId).
    success(function(user){
      $scope.user.nama = user.name;
      $scope.user.email = user.email;
      console.log(user.email);
    });

  $scope.user = function(){
    var putData = {
      id: $stateParams.getId,
      name: $scope.user.nama,
      email: $scope.user.email
    };

    $http.put(serverUrl + '/user/id/' + $stateParams.getId, putData).
      success(function(data) {
        console.log(data);
      });
    console.log($scope.user.nama);
  }

  $scope.delete = function(){
    $http.delete(serverUrl + '/user/id/' + $stateParams.getId).
      success(function(data){
        console.log(data);
        $ionicHistory.goBack();
      });
  }

});