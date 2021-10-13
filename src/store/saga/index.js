import {all, put, call, takeEvery, delay} from 'redux-saga/effects'
import login from './loginSaga'

export default function* rootSaga() {
    yield all([
        login()
    ])
}