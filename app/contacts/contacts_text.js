'use strict';

describe('myApp.contacts module', function() {

  beforeEach(module('myApp.view1'));

  describe('contacts controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view1Ctrl = $controller('View1Ctrl');
      expect(view1Ctrl).toBeDefined();
    }));

  });
});
