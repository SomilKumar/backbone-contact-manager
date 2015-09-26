/**
 * mainAppController
 */

contactManagerApp.controller('contactsListController', ['$scope', 'SyncData', function($scope, SyncData) {

  var contacts = this;
  contacts.allContacts = [];
  contacts.selectVal = null;
  contacts.availableOptions = [{
    id: '1',
    name: 'Name',
    val: 'name'
  }, {
    id: '2',
    name: 'Telephone',
    val: 'tel'
  }, {
    id: '3',
    name: 'Email',
    val: 'email'
  }];

  contacts.showFavFlag = false;

  SyncData.getInitalData('./data/contacts.json')
        .then(function(data) {
          
          contacts.allContacts = data;
        }, function(error) {
          
        });

  contacts.deleteContact = function(contactObj) {
    contacts.allContacts = SyncData.deleteContact(contactObj);
  }

  contacts.addToFavorites = function(contactObj) {
    contacts.allContacts = SyncData.addToFavorites(contactObj);
  }

  contacts.showFav = function(){
      contacts.showFavFlag = !contacts.showFavFlag;
   }

}]);

contactManagerApp.filter('Favorite', function() {
  return function(input, showFavorite) {
    input = input || [];
    var out = [];
    if (showFavorite) {
      for (var i = 0; i < input.length; i++) {
        if (input[i].favourite === showFavorite)
            out.push(input[i]);
      }
      return out;
    } else {
      return input;
      // conditional based on optional argument
    }

  };
});

