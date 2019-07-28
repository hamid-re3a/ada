import axios from 'axios';


export const createUser = config => async user => {
  return new Promise((resolve, reject) => {
    axios.post(`${config.base_url}/user/create`, user, {
      ...config.default_params(),
      params: user,
    })
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};

export const getUser = config => async id => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.base_url}/users/${id}`, config.default_params())
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};

export const getUsers = config => async () => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.base_url}/users`, config.default_params())
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};

export const updateUser = config => async user => {
  return new Promise((resolve, reject) => {
    axios.put(`${config.base_url}/users`, user, config.default_params())
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};

export const removeUser = config => async id => {
  return new Promise((resolve, reject) => {
    axios.delete(`${config.base_url}/users/${id}`, config.default_params())
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};

export const login = config => async (phone_number, password) => {
  return new Promise((resolve, reject) => {
    axios.get(`${config.base_url}/login`, {params: { phone_number, password }})
      .then(config.default_then(resolve))
      .catch(config.default_catch(resolve));
  });
};
