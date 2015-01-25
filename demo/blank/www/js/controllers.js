angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope) {})
.controller('sliderCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
  $scope.day = {
    today : (new Date()).toDateString()
  };

  $scope.selectedDay = $scope.day.today;

  $scope.setDate = function(day) {
    $scope.day.today = day;
    $scope.selectedDay = day;
  };
});
