import fetch from '@/utils/fetch';

export function login(UserName, Password) {
  return fetch({
    url: '/api/User/UserLogin',
    method: 'post',
    data: {
        UserName,
        Password
    }
  });
}
export function getInfo() {
  return fetch({
    url: '/api/User/GetUserInfo',
    method: 'get',
  });
}