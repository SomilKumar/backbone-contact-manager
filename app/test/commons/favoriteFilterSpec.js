/**
 * Favorite Filter test cases
 */

describe('Favorite filter', function() {
  var $filter, inputContacts = [{
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

  beforeEach(module('contactManagerApp'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  it('returns an array with favorite contacts only when passed true as parameter', function() {
    var favoriteFilter = $filter('Favorite');
    expect(favoriteFilter(inputContacts, true)).toEqual([{
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
  }]);
  });

  it('returns all contacts when passed false as parameter', function() {
    var favoriteFilter = $filter('Favorite');
    expect(favoriteFilter(inputContacts, false)).toEqual(inputContacts);
  });
});
