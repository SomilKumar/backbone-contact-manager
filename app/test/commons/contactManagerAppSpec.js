/**
 * contact Manager App Module Test Cases
 */

describe('Testing contactManagerAppModule', function() {
  describe('contactManagerApp', function() {

    var module;
    beforeEach(function() {
      module = angular.module('contactManagerApp');
    });

    it('should be registered', function() {
      expect(module).not.toEqual(null);
    });
  });

});
