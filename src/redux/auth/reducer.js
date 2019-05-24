import {
    CHECK_ACCESS_TOKEN_ALIVE,
    LOGIN_USER_SUCCESS,
    LOGIN_USER,
    LOGOUT_USER,
    ACCESS_TOKEN_ALIVE,
    LOGIN_USER_FAILED,
    RECOVER_PASSWORD,
    RECOVER_PASSWORD_SUCCESS,
    RECOVER_PASSWORD_FAILED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
} from './actions'

const INITIAL_STATE = {
	loading: false,
	accessToken: sessionStorage.getItem("access_token") || localStorage.getItem("access_token")
};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CHECK_ACCESS_TOKEN_ALIVE:
			return { ...state, loading: true, error: false };
		case LOGIN_USER_SUCCESS:
			return { ...state, loading: false, error: false, accessToken: action.payload.accessToken };
		case LOGIN_USER:
			return { ...state, loading: true, crendentials: action.payload.crendentials };
		case LOGOUT_USER:
			return { ...state, loading: false, error: false };
		case ACCESS_TOKEN_ALIVE:
			return { ...state, loading: true, error: false, currentUser: action.payload };
		case LOGIN_USER_FAILED:
			return { ...state, loading: false, error: true, errorMessage: action.payload.message };
		case RECOVER_PASSWORD:
			return { ...state, loading: true, error: false };
		case RECOVER_PASSWORD_SUCCESS:
			return { ...state, loading: false, error: false }
		case RECOVER_PASSWORD_FAILED:
			return { ...state, loading: false, error: true, errorMessage: action.payload.message }
		case CHANGE_PASSWORD:
			return { ...state, loading: true, error: false };
		case CHANGE_PASSWORD_SUCCESS:
			return { ...state, loading: false, error: false }
		case CHANGE_PASSWORD_FAILED:
			return { ...state, loading: false, error: true, errorMessage: action.payload.message }
		default:
			return state;
	}
};

export default reducer;