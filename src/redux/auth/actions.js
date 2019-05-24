export const CHECK_ACCESS_TOKEN_ALIVE = "CHECK_ACCESS_TOKEN_ALIVE"
export const ACCESS_TOKEN_ALIVE = "ACCESS_TOKEN_ALIVE"
export const LOGIN_USER = "LOGIN_USER"
export const LOGOUT_USER = "LOGOUT_USER"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAILED = "LOGIN_USER_FAILED"
export const RECOVER_PASSWORD = "RECOVER_PASSWORD"
export const RECOVER_PASSWORD_SUCCESS = "RECOVER_PASSWORD_SUCCESS"
export const RECOVER_PASSWORD_FAILED = "RECOVER_PASSWORD_FAILED"
export const CHANGE_PASSWORD = "CHANGE_PASSWORD"
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS"
export const CHANGE_PASSWORD_FAILED = "CHANGE_PASSWORD_FAILED"

export const checkSession = (accessToken, history) => ({
    type: CHECK_ACCESS_TOKEN_ALIVE,
    payload: { accessToken, history }
});

export const checkSessionSuccess = (payload) => ({
    type: ACCESS_TOKEN_ALIVE,
    payload
});

export const loginUser = (crendentials, history) => ({
    type: LOGIN_USER,
    payload: { crendentials, history }
});

export const logoutUser = (history, request) => ({
    type: LOGOUT_USER,
    payload: { history, request }
});

export const loginUserSuccess = (accessToken) => ({
    type: LOGIN_USER_SUCCESS,
    payload: { accessToken }
});

export const loginUserError = (payload) => ({
    type: LOGIN_USER_FAILED,
    payload
});

export const recoverPassword = email => ({
    type: RECOVER_PASSWORD,
    payload: { email }
})

export const recoverPasswordSuccess = payload => ({
    type: RECOVER_PASSWORD_SUCCESS,
    payload
})

export const recoverPasswordError = payload => ({
    type: RECOVER_PASSWORD_FAILED,
    payload
})

export const changePassword = (password, token) => ({
    type: CHANGE_PASSWORD,
    payload: { password, token }
})

export const changePasswordSuccess = payload => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload
})

export const changePasswordError = payload => ({
    type: CHANGE_PASSWORD_FAILED,
    payload
})