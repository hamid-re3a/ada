
export const SET_USER = 'SET_USER';
export const DELETE_USER = 'DELETE_USER';


export const ACT_setUser = (user) => ({
  type: SET_USER,
  user,
});

export const ACT_delUser = () => ({
  type: DELETE_USER,
});

export const ACT_signup = (username, password, passwordConfirm) =>
  (dispatch, getState, API) => { 
    return API.users.create({name: username, phone_number: username, password, password_confirmation:passwordConfirm})
    
  }

export const ACT_signin = (username, password) =>
  (dispatch, getState, API) => {
    // if (username === "admin" && password === "123")
    //   dispatch(ACT_setUser({ username, accessToken: '1qaz!QAZ' }));
    API.users.login(username, password).then(rs=>{
      if (rs.success !== false) {
        dispatch(ACT_setUser({ accessToken: rs.data.data.access_token }));
      }
      
    })
    return API.users.login(username, password);
  }

export const ACT_signout = () => dispatch => dispatch(ACT_delUser());
