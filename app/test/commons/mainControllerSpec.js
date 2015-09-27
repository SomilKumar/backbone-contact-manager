/**
 * mainController test cases
 */

describe('Testing mainController ', function() {
  var contacts;

  beforeEach(module('contactManagerApp'));

  beforeEach(inject(function(_$controller_, _$q_, _$httpBackend_, _$rootScope_, _$injector_) {
    this.$controller = _$controller_;
    this.$httpBackend = _$httpBackend_;
    this.$injector = _$injector_;
    this.$q = _$q_;
    this.$scope = _$rootScope_.$new();

    this.SyncData = this.$injector.get('SyncData');

    this.mainController = this.$controller('contactsListController', {
      SyncData: this.SyncData,
    });
    contacts = this.mainController;

    mockavailableOptions = [{
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

    mockSingleContactData = {
      'id': 1,
      'name': 'Aaron Brown',
      'tel': '3-(319)604-9492',
      'email': 'abrown0@aol.com',
      'avatar': './img/1.jpg',
      'favourite': true,
      'twitter': 'http://twitter.com',
      'facebook': 'http://facebook.com',
      'linkedIn': 'http://linkenIn.com'
    };

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

    /*Deferred Objects*/
    getInitialData = this.$q.defer();
    spyOn(this.SyncData, 'getInitialData').and.returnValue(getInitialData.promise);

    spyOn(this.SyncData, 'deleteContact').and.returnValue(mockContactData);
    spyOn(this.SyncData, 'addToFavorites').and.returnValue(mockContactData);

  }));

  it('Expect initial Values for mainController', function() {

    expect(contacts.showFavFlag).toEqual(false);
    expect(contacts.allContacts).toEqual([]);
    expect(contacts.selectVal).toEqual(null);
    this.$httpBackend.expectGET('./data/contacts.json')
               .respond(200, mockContactData);
    this.$httpBackend.flush();

    getInitialData.resolve(mockContactData);

    this.$scope.$digest();
    expect(contacts.availableOptions).toEqual(mockavailableOptions);
  });

  it('call showFav to change the favorite tag ',
        function() {
          contacts.showFav();
          expect(contacts.showFavFlag).toEqual(true);
        });

  it('call SyncData-deleteContact to delete a contact',
        function() {
          contacts.deleteContact(mockSingleContactData);
          expect(this.SyncData.deleteContact).toHaveBeenCalled();
        });

  it('call SyncData-addToFavorites to change a contact to a favorite contact',
        function() {
          contacts.addToFavorites(mockSingleContactData);
          expect(this.SyncData.addToFavorites).toHaveBeenCalled();
        });

});
