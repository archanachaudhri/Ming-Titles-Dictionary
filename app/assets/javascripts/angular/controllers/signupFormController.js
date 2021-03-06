titlesApp
  .controller('signupFormController', ['$scope', 'Auth', function($scope, Auth){

  $scope.submitted = false;
  $scope.emailExists = false;

  var displayThankYou = function() {
    $scope.submitted = true;
  };

  $scope.resetForm = function() {
    $scope.formData = null;
    $scope.submitted = false;
    $scope.emailExists = false;
    $scope.myForm.$setPristine();
  };

  $scope.resetEmailCheck = function() {
    $scope.emailExists = false;
  };

  $scope.submitUser = function(data) {
    var credentials = {
      email: data.email,
      fname: data.fname,
      lname: data.lname,
      country: data.country,
      institution: data.institution,
      research: data.research,
      password: data.password
                      };

    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    Auth.register(credentials, config).then(function(registeredUser) {
        // console.log(registeredUser); // => {id: 1, ect: '...'}
    }, function(error) {
        console.log("FAILED", error);
        if (error.data.errors && error.data.errors.email) {
          $scope.emailExists = true;
        }
    });

    $scope.$on('devise:new-registration', function(event, user) {
      console.log("reg complete");
      Auth.logout(config).then(function(oldUser) {
        if (oldUser) {
          userService.setUser({});
        }
      }, function(error) {
          console.log(error,"could not log out");
      });
      displayThankYou();
    });
  };

}]);
