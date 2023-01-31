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
    console.log('action', action)
    try {
        const { data } = yield call(authService.login, action.payload);
        yield put(verifyLoginSuccess(data));
    } catch (e) {
        yield put(verifyLoginFailed(e));
    }
}

function* fetchSignup(action: any) {
    console.log('action', action)
    try {
        const { data } = yield call(authService.register, action.payload);
        yield put(verifyLoginSuccess(data));
    } catch (e) {
        yield put(verifySignupFailed(e));
    }
}

function* fetchSignout(action: any) {
    console.log('action payload', action.payload)
    try {

        const { data } = yield call(authService.signout, action.payload);
        yield put(verifySignoutSuccess(data));

        console.log('yield')

        yield put(verifyLoginSuccess([]));
    } catch (e) {
        console.log('error')
        yield put(verifyLoginSuccess([]));

        yield put(verifySignoutFailed(e));
    }
}

export default function* root() {
    yield all([
        takeLatest(verifyLogin, fetchLogin),
        takeLatest(verifySignup, fetchSignup),
        takeLatest(verifySignout, fetchSignout)
    ])
}