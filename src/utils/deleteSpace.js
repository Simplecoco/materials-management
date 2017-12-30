export default (str) => {
  if (typeof str === 'string') {
    return str.replace(/\s/g, '');
  }
};
