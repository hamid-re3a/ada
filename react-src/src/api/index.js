
import { store } from 'redux/configureStore';

import { createUser, getUser, getUsers, updateUser, removeUser, login } from './users';


export const config = {
  base_url: "http://reserve.adakspa.com/api/v1",
  // base_url: "http://localhost:8000/api/v1",
  default_params: () => (store.getState().user.accessToken
    ? { headers: { Authorization: "Bearer " + store.getState().user.accessToken,Accept:'application/json' } }
    : {}),
  default_then: resolve => response => resolve({success: true,...response}),
  default_catch: resolve => response => resolve({ success: false, text: 'خطا در ارتباط با سرور', ...response }),
};

const API = {
  users: {
    create: createUser(config),
    get: getUser(config),
    getAll: getUsers(config),
    update: updateUser(config),
    remove: removeUser(config),
    login: login(config),
  },
};

export default API;
