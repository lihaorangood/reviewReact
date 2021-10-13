import * as types from '../action-types'
export default {
    login(username, password){
        console.log(username, password)
        return {
            type: types.login,
            payload:{
                username,
                password
            }
        }
    },
    logout(){
        return {
            type: types.logout_success,
        }
    }
}