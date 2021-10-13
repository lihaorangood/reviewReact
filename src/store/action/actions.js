import * as types from '../action-types'
export default {
    increment(){
        return {type: types.increment}
    },
    incrementAsync(){
        return {type:types.incrementAsync}
    }
}