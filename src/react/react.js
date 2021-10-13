import Component from "./Component";
/**
 *
 * @param {*} type 元素类型
 * @param {*} config 元素配置
 * @param {*} children 孩子 可能为undefined string object 或者孩子中的第一个
 */
function createRef() {
  return {
    current: null,
  };
}
function createElement(type, config, children) {
  let ref = null;
  console.log(config, 'config');
  if (config) {
    delete config.__source;
    delete config.__self;
    if (config.ref) {
      ref = config.ref;
    }
  }
  let props = { ...config };
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2);
  }
  props.children = children;
  return {
    type,
    props,
    ref
  };
}
export default {
  createElement: createElement,
  Component: Component,
  createRef,
};
