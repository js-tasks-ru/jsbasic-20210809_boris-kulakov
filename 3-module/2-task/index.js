function filterRange(arr, a, b) {
  let filterArr = arr.filter( item => 
    item >= Math.min(a, b) && item <= Math.max(a, b) );

  return filterArr;
}
