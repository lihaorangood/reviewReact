import {call, put, take} from 'redux-saga/effects'
import * as types from '../action-types'
import api from '../api'

function* login (username, password) {
    try {
        const {token} = yield api.login(username, password)
        return token
    }catch (e) {
        alert(e)
    }
}

export default function* () {
    while (true) {
        //    一直监听登录和登出动作，可以重复登录和登出
        let {payload} = yield take(types.login)
        console.log(payload, '---------')
       const  token =  yield call(login, payload.username, payload.password)
        console.log(token)
       if(token){
           yield put({type:types.login_success, token})
           yield take(types.logout)
       }
    }
}