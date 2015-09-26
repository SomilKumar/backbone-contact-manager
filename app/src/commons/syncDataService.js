/**
 * syncData Service
 *
 * To get and post data.
 */

'use strict'

contactManagerApp.service('SyncData', ['$http', '$q',
    function($http, $q) {

      var syncServiceObject = {};

      syncServiceObject.allContacts = [];

      syncServiceObject.getInitalData = function(url) {
        var deferred = $q.defer();
        $http.get(url)
                .then(function(response) {
                   if (syncServiceObject.allContacts.length <= 0)
                      syncServiceObject.allContacts = response.data;
                  deferred.resolve(syncServiceObject.allContacts);
                }).catch(function(data) {
                  console.log('Error in reading JSON');
                  deferred.reject(data);
                });

        return deferred.promise;
      }; //getIntialData

      syncServiceObject.findSelectedContact = function(id) {
        var selObj = {};
        for (var i = 0; i < syncServiceObject.allContacts.length; i++) {
          if (syncServiceObject.allContacts[i].id === parseInt(id)) {
            selObj = angular.merge({},syncServiceObject.allContacts[i]);
            break;
          }
        }
        return selObj;
      }; //findSelectedContact

      syncServiceObject.addContact = function(contactObj) {
        var id = syncServiceObject.allContacts.length + 1;
        contactObj['id'] = id;
        contactObj['avatar'] = './img/' + (Math.floor(Math.random() * 15)+1) + '.jpg';
        syncServiceObject.allContacts.push(contactObj);
      }; //addContact

      syncServiceObject.editContact = function(contactObj) {
        for (var i = 0; i < syncServiceObject.allContacts.length; i++) {
          if (syncServiceObject.allContacts[i].id === parseInt(contactObj.id)) {
            syncServiceObject.allContacts[i] = contactObj;
            break;
          }
        }
      }; //editContact

      syncServiceObject.deleteContact = function(contactObj) {
        for (var i = 0; i < syncServiceObject.allContacts.length; i++) {
          if (syncServiceObject.allContacts[i].id === parseInt(contactObj.id)) {
            syncServiceObject.allContacts.splice(i, 1);
            break;
          }
        }

        for (var j = 0; j < syncServiceObject.allContacts.length; j++)
            syncServiceObject.allContacts[j].id = j + 1;

          return syncServiceObject.allContacts;

      }; //deleteContact

        syncServiceObject.addToFavorites = function(contactObj) {
        for (var i = 0; i < syncServiceObject.allContacts.length; i++) {
          if (syncServiceObject.allContacts[i].id === parseInt(contactObj.id)) {
            syncServiceObject.allContacts[i].favourite = !(syncServiceObject.allContacts[i].favourite);
            break;
          }
        }

          return syncServiceObject.allContacts;

      }; //addToFavorites

      return syncServiceObject;

    }
]);
