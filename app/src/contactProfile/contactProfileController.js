/**
 * contactProfileController
 */

contactManagerApp.controller('contactProfileController', ['$scope','SyncData','$stateParams','$state',
  function($scope, SyncData, $stateParams, $state) {

    var profile = this;
    profile.selprofile = {};
    profile.id = $stateParams.id;
    if (profile.id) {
      profile.selprofile = SyncData.findSelectedContact(profile.id);
      profile.bannerText = 'Edit Contact';
      profile.addedit = true;
    } else {
      profile.bannerText = 'Add Contact';
      profile.addedit = false;
    }

    profile.editaddProfile = function() {
    if (profile.addedit)
      SyncData.editContact(profile.selprofile);

    else
      SyncData.addContact(profile.selprofile);

    $state.go('contact');

  };

  profile.cancel = function(){
    $state.go('contact');
  }


  }]);
