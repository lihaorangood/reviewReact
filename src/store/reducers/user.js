import * as types from '../action-types'

const initUser = {}
export default function (state = initUser, action) {
    switch (action.type) {
        case types.login_success:
            return {token: action.token}
        case types.logout_success:
            console.log(action)
            return {}
        default:
            return initUser
    }

}