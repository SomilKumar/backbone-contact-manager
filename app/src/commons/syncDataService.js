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

      syncServiceObject.getInitialData = function(url) {
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

      syncServiceObject.getRequiredIndex = function(arr, id) {
        for (var i = 0 ; i < arr.length; i++) {
          if (arr[i].id === parseInt(id))
            return i;
        }
      };//getRequiredIndex

      syncServiceObject.findSelectedContact = function(id) {
        var selObj = {};
        var index = syncServiceObject.getRequiredIndex(syncServiceObject.allContacts,id);
        selObj = angular.merge({},syncServiceObject.allContacts[index]);
        return selObj;
      }; //findSelectedContact

      syncServiceObject.addContact = function(contactObj) {
        var id = syncServiceObject.allContacts.length + 1;
        contactObj['id'] = id;
        contactObj['avatar'] = './img/' + (Math.floor(Math.random() * 15) + 1) + '.jpg';
        syncServiceObject.allContacts.push(contactObj);
      }; //addContact

      syncServiceObject.editContact = function(contactObj) {
        var index = syncServiceObject.getRequiredIndex(syncServiceObject.allContacts,contactObj.id);
        syncServiceObject.allContacts[index] = contactObj;
      }; //editContact

      syncServiceObject.deleteContact = function(contactObj) {
        var index = syncServiceObject.getRequiredIndex(syncServiceObject.allContacts,contactObj.id);
        syncServiceObject.allContacts.splice(index, 1);

        for (var j = 0; j < syncServiceObject.allContacts.length; j++)
            syncServiceObject.allContacts[j].id = j + 1;

        return syncServiceObject.allContacts;

      }; //deleteContact

      syncServiceObject.addToFavorites = function(contactObj) {
        var index = syncServiceObject.getRequiredIndex(syncServiceObject.allContacts,contactObj.id);
        syncServiceObject.allContacts[index].favourite = !(syncServiceObject.allContacts[index].favourite);
        return syncServiceObject.allContacts;

      }; //addToFavorites

      return syncServiceObject;

    }
]);
