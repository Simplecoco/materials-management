const setCookie = (cname, cvalue, exdays = 0.5) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const d2 = d.toGMTString();
  const expires = `expires=${d2}`;
  document.cookie = `${cname}=${cvalue};${expires}`;
};

const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

const clearCookie = (cname) => {
  setCookie(cname, '', -1);
};

export { setCookie, getCookie, clearCookie };

