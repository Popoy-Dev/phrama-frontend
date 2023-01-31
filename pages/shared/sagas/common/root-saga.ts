import { all, fork } from 'redux-saga/effects'

import auth from '../users/auth-saga'

export default function* root() {
    yield all([
        fork(auth)
    ])
}