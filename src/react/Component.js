import { isFunction } from "./utils";
import { _createDom } from "./react-dom";
// 导出批量更新的对象
export const updateQueue = {
  isBatchingUpdates: false, // 是否处于批量更新的状态
  updaters: [], //更新器的数组 默认是一个空数组
  add(updater) {
    if (!this.updaters.includes(updater)) {
      this.updaters.push(updater);
    }
  },
  batchUpdate() {
    this.isBatchingUpdates = true;
    this.updaters.forEach((updater) => updater.updateComponent());
    this.updaters.length = 0;
    this.isBatchingUpdates = false;
  },
};
function shouldUpdateComponent(classInstance, nextProps, nextState) {
  // 无论组件视图是否需要更新我们组件内部的转台是最新的
  classInstance.props = nextProps || classInstance.props;
  classInstance.state = nextState || classInstance.state;
  // 进行判断是否需要更新的判断 只有shouldComponentUpdate 存在的时候 并且执行返回结果是TRUE的时候我们才会进行更新 否则的话就直接返回停止执行 这样也进行了我们组件内部如果没有写shouldUpdateComponent的时候默认进行更新
  if (
    classInstance.shouldUpdateComponent &&
    !classInstance.shouldUpdateComponent(nextProps, nextState)
  ) {
    return;
  }
  classInstance.forceUpdate();
}
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance;
    this.pendingState = [];
  }
  addState(partialState) {
    this.pendingState.push(partialState);
    this.emitUpdate();
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (this.nextProps || !updateQueue.isBatchingUpdates) {
      this.updateComponent();
    } else {
      updateQueue.add(this);
    }
  }
  updateComponent() {
    const { classInstance, pendingState, nextProps } = this;
    if (nextProps || pendingState.length) {
      // classInstance.state = this.getState();
      // classInstance.forceUpdate();
      shouldUpdateComponent(classInstance, nextProps, this.getState());
    }
  }
  getState() {
    let { classInstance, pendingState } = this;
    const { state } = classInstance;
    let nextState = state;
    if (pendingState.length) {
      pendingState.forEach((partialState) => {
        if (isFunction(partialState)) {
          nextState = { ...partialState, ...partialState(nextState) };
        } else {
          nextState = { ...nextState, ...partialState };
        }
      });
    }
    return nextState;
  }
}
class Component {
  constructor(props) {
    this.props = props;
    this.state = {};
    this.$updater = new Updater(this);
  }
  setState(partialState) {
    this.$updater.addState(partialState);
  }
  forceUpdate() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate();
    }
    let oldDom = this.dom;
    const newVdom = this.render();
    const newDom = _createDom(newVdom);
    oldDom.parentNode.replaceChild(newDom, oldDom);
    this.dom = newDom;
    if (this.componentDidUpdate) {
      this.componentDidUpdate();
    }
  }
}
Component.prototype.isReactComponent = {};
export default Component;
