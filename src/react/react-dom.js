import { addEvent } from "./event";
/**
 *
 * @param {*} virtualDom 虚拟的dom节点 就是一个JavaScript对象
 * @param {*} parentDom 真实的的浏览器DOM节点
 */
function render(virtualDom, parentDom) {
  const dom = _createDom(virtualDom);
  parentDom.appendChild(dom);
}
/**
 * 将虚拟的DOM生成真正的浏览器DOM节点, 并进行虚拟节点的属性和children的处理
 * @param {*} virtualDom
 */
export function _createDom(virtualDom) {
  if (typeof virtualDom === "string" || typeof virtualDom === "number") {
    const dom = document.createTextNode(virtualDom);
    return dom;
  } else {
    const { type, props, ref } = virtualDom;

    let dom;
    if (typeof type == "function") {
      return type.prototype.isReactComponent
        ? _compileClassComponent(virtualDom)
        : _compileFunctionComponent(virtualDom);
    } else {
      dom = document.createElement(virtualDom.type);
      if (ref) {
        ref.current = dom;
      }
    }

    _updateProps(virtualDom.props, dom);
    if (
      typeof props.children == "string" ||
      typeof props.children == "number"
    ) {
      // 如果是原始类型string number类型的时候
      dom.textContent = props.children;
    } else if (
      props.children &&
      !Array.isArray(props.children) &&
      props.children.type
    ) {
      // 如果是一个单纯的对象的时候
      render(props.children, dom);
    } else if (props.children && Array.isArray(props.children)) {
      //  props.children 是一个数组
      _recompileChildren(props.children, dom);
    } else {
      console.warn(props.children, "children");
      dom.textContent = JSON.stringify(props.children);
    }
    return dom;
  }
}
/**
 * 进行属性的处理 包括 className style 或者其他属性 注意我们次函数处理的范围不包括children属性, children有专门的函数进行处理
 * @param {*} virtualDom
 */
function _updateProps(props, dom) {
  for (const key in props) {
    if (key == "children") continue;
    else if (key == "style") {
      const style = props[key];
      let styleStr = "";
      for (const key in style) {
        dom.style[key] = style[key];
      }
    } else if (key == "className") {
      dom.class = props[key];
    } else if (key.startsWith("on")) {
      // 事件绑定
      addEvent(dom, key.toLowerCase(), props[key]);
    } else {
      dom[key] = props[key];
    }
  }
}
/**
 * 进行children类型的判断
 * @param {*} children
 * @param {*} dom
 */
function _recompileChildren(children, dom) {
  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    render(element, dom);
  }
}
function _compileFunctionComponent(virtualDom) {
  const { type, props } = virtualDom;
  const realVirtual = type(props);
  return _createDom(realVirtual);
}
function _compileClassComponent(virtualDom) {
  const { type, props, ref } = virtualDom;
  const instance = new type(props);
  if (ref) {
    ref.current = instance;
  }
  if (instance.componentWillMount) {
    instance.componentWillMount();
  }
  const realVirtual = instance.render();
  if (instance.componentDidMount) {
    instance.componentDidMount();
  }
  const dom = _createDom(realVirtual);
  instance.dom = dom;
  return dom;
}
export default {
  render: render,
};
