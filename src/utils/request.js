import fetch from 'dva/fetch';
import { notification, Icon, message } from 'antd';
// import * as loginService from '../services/login';
import * as cookie from '../utils/cookie';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 304) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function _fetch(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ err }));
}

async function logout() {
  const { code, msg } = await _fetch('/v1/supply/user/logout', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      token: cookie.getCookie('token'),
    },
    body: JSON.stringify({ uid: cookie.getCookie('uid') }),
  });
  if (code === 0 || code === 604 || code === 606) {
    const infoArr = ['name', 'uid', 'avatar', 'token'];
    await infoArr.forEach((item) => {
      cookie.clearCookie(item);
    });
    window.location.hash = '#/login';
    await notification.open({
      message: 'Failed !!!',
      description: '你的账号在另外一台设备登录，导致你被迫下线，如果不是你本人所为，请联系管理员修改密码',
      icon: <Icon type="frown" style={{ color: 'pink' }} />,
      duration: 20,
      placement: 'topLeft'
    });
  }
  else {
    message.error(`错误啦~,错误信息: ${msg}`);
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const { code } = data;
      // 拦截，如果code等于606就退出登录
      if (code === 606) {
        logout();
        return data;
      }
      return data;
    })
    .catch(err => ({ err }));
}
