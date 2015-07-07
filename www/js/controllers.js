angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('GetAllCtrl', function($scope, $http){
  function getAll(){
    $http.get('http://localhost/github/myigniter/index.php/api/user').
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

.controller('GetCtrl', function($scope, $http, $stateParams, $ionicHistory){
  $http.get('http://localhost/github/myigniter/index.php/api/user/id/' + $stateParams.getId).
    success(function(user){
      $scope.user = user;
    });

  $scope.update = function(id){
    $ionicHistory.goBack();
  }

  $scope.delete = function(id){
    $http.delete('http://localhost/github/myigniter/index.php/api/user/id/' + id).
      success(function(data){
        console.log(data);
        $ionicHistory.goBack();
      });
  }

}) 

.controller('PostCtrl', function($scope, $http){
  $scope.post = function() {
    var postData = {
      name: $scope.post.nama,
      email: $scope.post.email
    };

    $http.post('http://localhost/github/myigniter/index.php/api/user', postData).
      success(function(data) {
        console.log(data);
      });

    $scope.post.nama = '';
    $scope.post.email = '';
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});