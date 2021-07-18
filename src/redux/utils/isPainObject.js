// 这里主要提供一个方法，判断一个参数是否是一个纯净的对象
function isPainObject(obj){
    if(typeof ob !== 'object' || obj==null){
        return false //说明这根本不是一个
    }
    return Object.getPrototypeOf(obj) === Object.prototype
}
export default isPainObject