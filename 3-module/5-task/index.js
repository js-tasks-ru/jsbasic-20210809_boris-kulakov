function getMinMax(str) {
  let splitedStr = str.split(' ');

  let numberStr = splitedStr.filter(str => isFinite(str) );

  let result = {
    "min" : +numberStr[0],
    "max" : +numberStr[0],
  };

  for (let i = 0; i < numberStr.length; i++) {
    if ( numberStr[i] < result.min ) {

      result.min = +numberStr[i];
    
    }else if ( numberStr[i] > result.max ) {
      
      result.max = +numberStr[i];

    }
  }

  return result;
}
