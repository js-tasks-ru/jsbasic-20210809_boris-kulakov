function ucFirst(str) {
  switch (str.length) {
    case 0: return '';
    case 1: return str.toUpperCase();
    default: return str[0].toUpperCase() + str.slice(1, str.length);
  }
}
