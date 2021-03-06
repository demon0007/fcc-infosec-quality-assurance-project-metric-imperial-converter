/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      let result = convertHandler.getNum(input)
      // console.log(result)
      assert.equal(result,32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '32.5L';
      assert.equal(convertHandler.getNum(input),32.5);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/2L';
      // console.log(convertHandler.getNum(input))
      // console.log(convertHandler.getUnit(input))
      assert.equal(convertHandler.getNum(input),1.5);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3.1/2L';
      // console.log(convertHandler.getNum(input))
      assert.equal(convertHandler.getNum(input),3.5);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '3/2/2L';
      assert.equal(convertHandler.getNum(input),'Invalid Number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'L';
      assert.equal(convertHandler.getNum(input),parseFloat(1));
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        // console.log(convertHandler.getUnit(ele) + ' ' + ele.toLowerCase())
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('cm'), 'Invalid Unit')
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        // console.log(convertHandler.getReturnUnit(ele) + ' ' + expect[i])
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','Litres','miles','Kilometers','pound','Kilograms'];
      input.forEach(function(ele, i) {
        // console.log(ele + ' ' + convertHandler.getReturnUnit(ele) + ' ' + expect[i])
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
      // done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      // console.log(convertHandler.convert(input[0],input[1]),expected)
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.01); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [5, 'L'];
      var expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [5, 'mi'];
      var expected = 8.04672;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [5, 'km'];
      var expected = 3.10685;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [5, 'lbs'];
      var expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [5, 'kg'];
      var expected = 11.02311;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});