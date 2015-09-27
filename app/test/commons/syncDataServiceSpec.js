/**
 * SyncDataService  test cases
 */

describe('Service: SyncDataService Specs', function() {
  var element, scope, $compile;

  beforeEach(module('contactManagerApp'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$injector_) {
    this.$compile = _$compile_;

    this.$injector = _$injector_;
    this.$rootScope = _$rootScope_;
    this.$httpBackend = _$httpBackend_;
    this.$q = this.$injector.get('$q');

    this.scope = this.$rootScope.$new();
    this.SyncData = this.$injector.get('SyncData');

    mockContactData = [{
      'id': 1,
      'name': 'Aaron Brown',
      'tel': '3-(319)604-9492',
      'email': 'abrown0@aol.com',
      'avatar': './img/1.jpg',
      'favourite': true,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    }, {
      'id': 2,
      'name': 'Katherine White',
      'tel': '0-(821)751-1697',
      'email': 'kwhite1@timesonline.co.uk',
      'avatar': './img/2.jpg',
      'favourite': true,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    }, {
      'id': 3,
      'name': 'Karen Barnes',
      'tel': '3-(289)576-5243',
      'email': 'kbarnes2@wikia.com',
      'avatar': './img/3.jpg',
      'favourite': false,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    }];

    mockSingleContactData = {
      'name': 'Stuart Brown',
      'tel': '3-(319)604-9492',
      'email': 'abrown0@aol.com',
      'favourite': false,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    };

    mockDeleteContactData = {
      'id': 3,
      'name': 'Karen Barnes',
      'tel': '3-(289)576-5243',
      'email': 'kbarnes2@wikia.com',
      'avatar': './img/3.jpg',
      'favourite': false,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    }

  }));

  it('Expect getInitialData to return a promise after making a http request. Success case',
        function() {

          this.$httpBackend.whenGET('./data/contacts.json').respond(200, {
            'data': mockContactData
          });

          var promObj = this.SyncData.getInitialData('./data/contacts.json');

          this.$httpBackend.flush();

          promObj.then(function(response) {
            expect(response.data).not.toBeUndefined();
            expect(response.data).toEqual(mockContactData);
          }, function() {
            console.log('failed');
          });
        });

  it('Expect getInitialData to return a promise after making a http request and have previous contacts . Success case',
        function() {

          this.SyncData.allContacts = mockContactData;

          this.$httpBackend.whenGET('./data/contacts.json').respond(200, {
            'data': mockContactData
          });

          var promObj = this.SyncData.getInitialData('./data/contacts.json');

          this.$httpBackend.flush();

          promObj.then(function(response) {
            expect(response.data).not.toBeUndefined();
            expect(this.SyncData.allContacts).toEqual(mockContactData);
          }, function() {
            console.log('failed');
          });
        });

  it('Expect getInitialData to return a promise after making a http request. Exception case',
        function() {
          this.$httpBackend.whenGET('./data/contacts.json').respond(500, {
            'data': 'exception'
          });
          var promObj = this.SyncData.getInitialData('./data/contacts.json');

          this.$httpBackend.flush();

          promObj.then(function(response) {
            console.log('success');
          }, function(data) {
            expect(data).toBeDefined();
          });
        });

  it('Expect getRequiredIndex  to return a index from array passed to it.',
        function() {

          var index = this.SyncData.getRequiredIndex(mockContactData, '2');
          expect(index).toBeDefined(1);
        });

  it('Expect addContact  to add a contact to the list of all contacts.',
        function() {
          this.SyncData.allContacts = mockContactData;
          var len = this.SyncData.allContacts.length;
          this.SyncData.addContact(mockSingleContactData);
          expect(this.SyncData.allContacts.length).toEqual(len + 1);
        });

  it('Expect findSelectedContact  to return a the required contact object.',
        function() {
          this.SyncData.allContacts = mockContactData;
          var id = 2;
          var selObj = this.SyncData.findSelectedContact('2');
          expect(selObj).toEqual(this.SyncData.allContacts[1]);
        });

  it('Expect editContact  to edit the required contact object.',
        function() {
          this.SyncData.allContacts = mockContactData;
          var contactObj = {
            'id': 3,
            'name': 'Karen Charles',
            'tel': '3-(289)576-1234',
            'email': 'kbarnes2@wikia.co.in',
            'avatar': './img/3.jpg',
            'favourite': true,
            'twitter': 'http://twitter.com',
            'facebook': 'http://facebook.com',
            'linkedIn': 'http://linkenIn.com'
          };
          this.SyncData.editContact(contactObj);
          expect(this.SyncData.allContacts[2]).toEqual(contactObj);
        });

  it('Expect deleteContact  to delete the required contact object.',
        function() {
          this.SyncData.allContacts = mockContactData;
          var len = this.SyncData.allContacts.length;
          var contactObj = mockDeleteContactData;
          var allObjects = this.SyncData.deleteContact(contactObj);
          expect(allObjects.length).toEqual(len - 1);
        });

  it('Expect addToFavorites to add the required contact object as favourite.',
        function() {
          this.SyncData.allContacts = mockContactData;
          var contactObj = mockDeleteContactData;
          var allObjects = this.SyncData.addToFavorites(contactObj);
          expect(allObjects[2].favourite).toEqual(true);
        });

});
