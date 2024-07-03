const app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $interval, hexafy, $http) {
  $scope.person = { firstName: "Siva", lastName: "Asam" };
  $scope.myArray = ["a", "b", "c"];
  $scope.myName = "Siva";
  $scope.names = ["Siva", "Asam", "Sankar Reddy", "krishna", "Devil"];
  $scope.counts = [103, 2, 78, 255, 5];
  $scope.changeName = function () {
    $scope.myName === "Siva Sankar Reddy"
      ? ($scope.myName = "Siva")
      : ($scope.myName = "Siva Sankar Reddy");
  };

  $http({
    method: "GET",
    url: "welcome.txt",
  }).then(
    function (response) {
      $scope.myWelcome = response.data;
    },
    function (response) {
      $scope.myWelcome = response.statusText;
    }
  );

  $scope.myTime = new Date().toLocaleTimeString();

  $scope.hex = hexafy.myFunc(10);

  $interval(function () {
    $interval(function () {
      $scope.myTime = new Date().toLocaleTimeString();
    }, 1000);
  });
});

app.directive("myDirective", function () {
  return {
    template: "I was created by a directive",
  };
});

app.service("hexafy", function () {
  this.myFunc = function (x) {
    return x.toString(16);
  };
});

app.filter("myFilter", [
  "hexafy",
  function (hexafy) {
    return function (x) {
      return hexafy.myFunc(x);
    };
  },
]);

app.directive("customDirective", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, mCtrl) {
      function myValidation(value) {
        if (value.indexOf("e") > -1) mCtrl.$setValidity("charE", true);
        else mCtrl.$setValidity("charE", false);
        return value;
      }
      mCtrl.$parsers.push(myValidation);
    },
  };
});
