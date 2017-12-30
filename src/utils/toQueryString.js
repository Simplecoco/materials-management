const toQueryString = (obj) => {
  return obj ? Object.keys(obj).sort().map((key) => {
    const val = obj[key];
    if (Array.isArray(val)) {
      return val.sort().map((val2) => {
        return `${encodeURIComponent(key)} = ${encodeURIComponent(val2)}`;
      }).join('&');
    }
    return `${encodeURIComponent(key)} = ${encodeURIComponent(val)}`;
  }).join('&') : '';
};

export default toQueryString;
