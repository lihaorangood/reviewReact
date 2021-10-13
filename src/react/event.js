import {updateQueue} from "./Component"
/**
 *
 * @param {*} target button 绑定对象
 * @param {*} eventType onclick 绑定类型
 * @param {*} listener 触发回调
 */
let syncEvent = {}; // 最终的自定义事件 方便回收 我们可以往里面添加一些自定义属性或者做一些浏览器兼容性处理
export function addEvent(target, eventType, listener) {
  const store = target.store || (target.store = {});
  store[eventType] = listener;
  document.addEventListener(eventType.slice(2), dispatchEvent, false); // 都绑定到document 上
}
function dispatchEvent(event) {
  const { target, type } = event; // target button type click 没有on
  const store = target.store;
  for (const key in event) {
    syncEvent[key] = event[key];
  }
  syncEvent.nativeEvent = event;
  const listener = store && store["on" + type];
  updateQueue.isBatchingUpdates = true
  listener && listener.call(null, syncEvent);
  // updateQueue.isBatchingUpdates = false
  updateQueue.batchUpdate()
  for (const key in syncEvent) {
    syncEvent[key] = null;
  }
}
export default {
  addEvent: addEvent,
};
