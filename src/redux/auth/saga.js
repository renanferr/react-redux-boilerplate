import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { Auth } from '../../repositories/auth';

import {
   loginUserSuccess,
   checkSessionSuccess,
   logoutUser,
   loginUserError,
   recoverPasswordError,
   recoverPasswordSuccess,
   changePasswordSuccess,
   changePasswordError
} from './actions';

function* loginWithEmailPassword({ payload }) {
   const { email, password, remember } = payload.crendentials;
   const { history } = payload;
   try {
      const loginUser = yield call(Auth.signInWithEmailAndPassword, email, password);
      if (!loginUser.message) {
         if (remember) {
            localStorage.setItem('access_token', loginUser.access_token);
         } else {
            sessionStorage.setItem('access_token', loginUser.access_token);
         }
         yield put(loginUserSuccess(loginUser));
         history.push('/app/dashboard');
      } else {
         console.log("Login user error")
         yield put(loginUserError({ message: loginUser.message }));
      }
   } catch (error) {
      yield put(loginUserError({ message: error.message }));
   }
}

const getAccessToken = function () {
   let access_token = sessionStorage.getItem('access_token');
   if (!access_token) {
      access_token = localStorage.getItem("access_token");
   }
   return access_token;
}

function* checkToken({ payload }) {
   const access_token = getAccessToken();
   const { history } = payload;

   try {
      const currentUser = yield call(Auth.getCurrentUser, access_token);
      yield put(checkSessionSuccess(currentUser));
   } catch (error) {
      yield put(logoutUser(history, error));
   }
}

function* recoverPasswordWithEmail({ payload }) {
   const { email } = payload
   try {
      const passwordRecovery = yield call(Auth.recoverPassword, email)
      if (passwordRecovery.status > 199 && passwordRecovery.status < 300) {
         yield put(recoverPasswordSuccess(passwordRecovery))
      } else {
         yield put(recoverPasswordError(passwordRecovery.message || passwordRecovery.error || passwordRecovery.statusMessage))
      }
   } catch (err) {
      console.log("Error recovering password", err)
      yield put(recoverPasswordError({ message: err.message || err.error || err.statusMessage }))
   }

}

function* changePasswordByToken({ payload }) {
   const { password, token } = payload
   try {
      const response = yield call(Auth.changePassword, password, token)
      if (response.status > 199 && response.status < 300) {
         yield put(changePasswordSuccess())
      } else {
         yield put(changePasswordError(response.message || response.error || response.statusMessage))
      }
   } catch (err) {
      console.log("Error changing password", err)
      yield put(changePasswordError({ message: err.message || err.error || err.statusMessage }))
   }

}

function* logout({ payload }) {
   const { history, request } = payload;

   if (!request || request.status !== 401) {
      yield call(Auth.signOut, getAccessToken());
   }

   history.push('/login')

   localStorage.removeItem('access_token');
   sessionStorage.removeItem('access_token');
}

export function* watchLoginUser() {
   yield takeEvery("LOGIN_USER", loginWithEmailPassword);
}

export function* watchLogoutUser() {
   yield takeEvery("LOGOUT_USER", logout);
}

export function* watchCheckToken() {
   yield takeEvery("CHECK_ACCESS_TOKEN_ALIVE", checkToken);
}

export function* watchRecoverPassword() {
   yield takeEvery("RECOVER_PASSWORD", recoverPasswordWithEmail)
}

export function* watchChangePassword() {
   yield takeEvery("CHANGE_PASSWORD", changePasswordByToken)
}

export default function* rootSaga() {
   yield all([
      fork(watchLoginUser),
      fork(watchCheckToken),
      fork(watchLogoutUser),
      fork(watchRecoverPassword),
      fork(watchChangePassword)
   ]);
}