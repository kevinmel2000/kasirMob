var serverUrl = 'http://localhost/github/myigniter/index.php/api';
//var serverUrl = 'http://myigniter.esy.es/index.php/api';

angular.module('starter.controllers', [])

//Service Local Storage
.factory('$localstorage', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
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
    }
  };
})

.controller('DashCtrl', function($scope, $localstorage) {
  // $localstorage.set('name', 'aaaaa');
  // $localstorage.delete('name');
  // console.log($localstorage.get('name'));
  // $localstorage.setObject('post', {
  //   name: 'Thoughts',
  //   text: 'Today was a good day'
  // });
  // var post = $localstorage.getObject('post');
  // console.log(post);
  var data = [];
  data.push('abc');
  data.push('aa');

  // $localstorage.delete('post');
  // $localstorage.setObject('post', data);

  $scope.array = $localstorage.getObject('post');
  $scope.local = $localstorage.getObject('post')[1];
})

// Local Storage
.controller('GetLocalCtrl', function($scope, $localstorage){
  function getLocal(){
    $scope.users = $localstorage.getObject('users');  
  }

  getLocal();

  $scope.refreshGet = function(){
    getLocal();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $scope.linkPost = 'postLocal';
  $scope.linkDetail = 'getLocal';
})

.controller('PostLocalCtrl', function($scope, $localstorage){
  // var user = [
  //   { id_api: 0, name: 'Jhon local', email: 'jhon@local' },
  //   { id_api: 1, name: 'Joko local', email: 'joko@local' }
  // ];

  // $localstorage.setObject('users', user);
    
})

.controller('GetLocalDetailCtrl', function($scope, $localstorage, $stateParams, $ionicHistory){
  user = $localstorage.getObject('users')[$stateParams.getId];
  $scope.user = {nama:user.name, email:user.email};

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

  $scope.linkPost = 'post';
  $scope.linkDetail = 'getAll';
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