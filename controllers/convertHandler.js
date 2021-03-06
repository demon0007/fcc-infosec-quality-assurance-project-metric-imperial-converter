/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.conversionTable = { 'gal': 'L',
                          'l': 'gal',
                          'lbs': 'kg',
                          'mi': 'km',
                         'kg': 'lbs',
                         'km': 'mi'}
  
  this.conversionChart = { 'gal': 3.78541,
                          'l': 1/3.78541,
                          'lbs': 0.453592,
                          'mi': 1.60934,
                         'kg': 1/0.453592,
                         'km': 1/1.60934}
  
  this.spellOutChart = { 'gal': 'gallons',
                          'l': 'Litres',
                          'lbs': 'pound',
                          'mi': 'miles',
                         'kg': 'Kilograms',
                         'km': 'Kilometers'}
  
  this.getNum = function(input) {
    // console.log('inside function')
    // console.log(input)
    var result;
    var patt = /[A-Za-z]/g;
    var firstChar = patt.exec(input);
    // console.log(firstChar)
    if (input.indexOf(firstChar) == 0) result = parseFloat(1)
    else {
      result = input.substring(0, input.indexOf(firstChar))
      // console.log(result)
      let newPat = /[^./0-9]/g
      let match = newPat.exec(result)
      if (match !== null ) return 'Invalid Number'
      let dec = result.indexOf('.')
      let frac = result.indexOf('/')
      if (dec >= 0 && frac >= 0) {
        if ( result.match(/[/]/g).length > 1 || result.match(/[.]/g).length > 1) return 'Invalid Number' 
        let integer = result.substring(0, dec)
        let nume = parseInt(result.substring(dec+1, frac))
        let denom = parseInt(result.substring(frac+1))
        let fraction = (nume/denom).toFixed(5)
        // console.log(integer)
        // console.log(fraction)
        result = parseFloat(parseInt(integer) + parseFloat(fraction))
        // console.log(result)
      } else if (frac >= 0) {
        if ( result.match(/[/]/g).length > 1) return 'Invalid Number'
        let nume = parseInt(result.substring(0, frac))
        let denom = parseInt(result.substring(frac+1))
        let fraction = (nume/denom).toFixed(5)
        result = parseFloat(fraction)
      } else if (dec >= 0) {
        if ( result.match(/[.]/g).length > 1) return 'Invalid Number'
        // let integer = result.substring(0, dec)
        result = parseFloat(result)
      } 
    }
    return parseFloat(result)
  };
  
  this.getUnit = function(input) {
    var result;
    var patt = /[A-Za-z]/g;
    var firstChar = patt.exec(input);
    result = input.substring(input.indexOf(firstChar))
    // console.log(result)
    if (Object.keys(this.conversionChart).indexOf(result.toLowerCase()) == -1) return 'Invalid Unit'
    return result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) { 
    return this.conversionTable[initUnit.toLowerCase()].toLowerCase();
  };

  this.spellOutUnit = function(unit) {
    return this.spellOutChart[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    // const galToL = 3.78541;
    // const lbsToKg = 0.453592;
    // const miToKm = 1.60934;
    var result = initNum*this.conversionChart[initUnit.toLowerCase()]
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = initNum.toString()+ ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum.toString()+ ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
