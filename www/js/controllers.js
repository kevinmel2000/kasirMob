var serverUrl = 'http://localhost/github/myigniter/index.php/api';
//var serverUrl = 'http://myigniter.esy.es/index.php/api';

angular.module('starter.controllers', [])

//Service Local Storage
.factory('$localstorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    delete: function(key) {
      $window.localStorage.removeItem(key);
    },
    deleteObject: function(key, index) {
      object = JSON.parse($window.localStorage[key] || '{}');
      object.splice(object.indexOf(index), 1);
      $window.localStorage[key] = JSON.stringify(object);      
    },
    clear: function(clear) {
      $window.localStorage.clear();
    }
  };
})

.controller('DashCtrl', function($scope, $localstorage) {
  // Local Storage

  // $localstorage.set('name', 'jhon');
  // console.log($localstorage.get('name'));
  // $localstorage.delete('name');
  
  // $localstorage.setObject('post', {
  //   name: 'Thoughts',
  //   text: 'Today was a good day'
  // });
  // console.log($localstorage.getObject('post'));
  // $localstorage.deleteObject('post', '0');

  // $localstorage.clear();
})

//HTTP
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
  };

  $scope.delete = function(){
    $http.delete(serverUrl + '/user/id/' + $stateParams.getId).
      success(function(data){
        console.log(data);
        $ionicHistory.goBack();
      });
  };

});