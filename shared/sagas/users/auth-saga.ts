import { call, put, all, takeLatest } from 'redux-saga/effects'
import authSlice from './../../slices/auth-slice'
import authService from './../../services/auth-service'

const {
    verifyLogin,
    verifyLoginSuccess,
    verifyLoginFailed,
    verifySignup,
    verifySignupFailed,
    verifySignout,
    verifySignoutSuccess,
    verifySignoutFailed,

} = authSlice.actions

function* fetchLogin(action: any) {
    try {
        const { data } = yield call(authService.login, action.payload);
        yield put(verifyLoginSuccess(data));
    } catch (e) {
        yield put(verifyLoginFailed(e));
    }
}

function* fetchSignup(action: any) {
    try {
        const { data } = yield call(authService.register, action.payload);
        yield put(verifyLoginSuccess(data));
    } catch (e) {
        yield put(verifySignupFailed(e));
    }
}

function* fetchSignout() {
    yield put(verifyLoginSuccess([]));
}

export default function* root() {
    yield all([
        takeLatest(verifyLogin, fetchLogin),
        takeLatest(verifySignup, fetchSignup),
        takeLatest(verifySignout, fetchSignout)
    ])
}