function camelize(str) {
  let camel = str.split('-');

  for (let i = 1; i < camel.length; i++) {
    camel[i] = camel[i][0].toUpperCase() + camel[i].slice(1);
  }

  return camel.join('');
}
