/**
 * contactProfileController test cases
 */

describe('Testing contactProfileController ', function() {
  var element
  var that;
  var contacts;

  beforeEach(module('contactManagerApp'));

  beforeEach(inject(function(_$controller_, _$q_, _$http_, _$rootScope_, _$injector_) {
    this.$controller = _$controller_;
    this.$http = _$http_;
    this.$injector = _$injector_;
    this.$q = _$q_;
    this.$scope = _$rootScope_.$new();

    this.$stateParams = this.$injector.get('$stateParams');
    this.$state =  this.$injector.get('$state');
    this.SyncData =  this.$injector.get('SyncData');
    this.contactProfileController = this.$controller('contactProfileController', {
      SyncData: this.SyncData,
      $stateParams: {},
      $state: {'go': function() {
        console.log('go to desired state');
      }}
    });

    profile = this.contactProfileController;

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

    /*Deferred Objects*/
    getInitialData = this.$q.defer();
    spyOn(this.SyncData, 'findSelectedContact').and.returnValue(mockSingleContactData);
    spyOn(this.SyncData, 'addContact').and.callThrough();
    spyOn(this.SyncData, 'editContact').and.callThrough();

  }));

  it('Expect initial values for contactProfileController', function() {

    expect(profile.selprofile).toEqual({});
    expect(profile.bannerText).toEqual('Add Contact');
    expect(profile.addedit).toEqual(false);
  });

  it('Expect initial values for contactProfileController with stateParams', function() {

    this.$stateParams['id'] = 1;
    profileCtrl = this.$controller('contactProfileController', {
      SyncData: this.SyncData,
      $stateParams: {'id': 1},
      $state: {}
    });
    expect(profileCtrl.selprofile).toEqual(mockSingleContactData);
    expect(profileCtrl.bannerText).toEqual('Edit Contact');
    expect(profileCtrl.addedit).toEqual(true);
  });

  it('Expect profileEdit to call add contact function of SyncData', function() {

    profile.addedit = false;
    profile.editaddProfile();
    expect(this.SyncData.editContact).not.toHaveBeenCalled();
    expect(this.SyncData.addContact).toHaveBeenCalled();
  });

  it('Expect profileEdit to call add contact function of SyncData', function() {

    profile.addedit = true;
    profile.editaddProfile();
    expect(this.SyncData.editContact).toHaveBeenCalled();
    expect(this.SyncData.addContact).not.toHaveBeenCalled();
  });

  it('Expect profileEdit to call function Cancel', function() {
    profile.cancel();
  });
  /*
  it('Expect profileEdit to call edit contact function of SyncData', function() {
      profile.addedit = true;
      profile.editaddProfile();
      expect(this.SyncData.editContact).toHaveBeenCalled();
      expect(this.SyncData.addContact).not.toHaveBeenCalled();
    });*/
});
