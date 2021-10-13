import * as types from '../action-types'
let initValue = {number:0}
export default function (state = initValue, action) {
    switch (action.type) {
        case types.increment:
            return {number: state.number+ 1}
        default:
            return state
    }

}