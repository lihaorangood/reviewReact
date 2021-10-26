// import React, { Component } from "./react/react";
// import ReactDOM from "./react/react-dom";
import ReactDOM from "react-dom";
import React, { useState, useEffect } from "react";
let a = React.createRef();

// const element = React.createElement(
//   "h1",
//   {
//     className: "n",
//     style: {
//       color: "red",
//     },
//   },
//   "hello",
//   React.createElement("span", null, "world")
// );
// function FunctionComponent(props) {
//   return (
//     <div>
//       <span>{props.name}</span>
//     </div>
//   );
// }
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.classRef = React.createRef();
    this.state = {
      number: 0,
    };
    console.log("1组件初始化");
  }
  componentWillMount() {
    console.log("2组件将要挂载");
  }
  componentDidMount() {
    console.log("4 组件已经挂载");
  }
  shouldUpdateComponent(nextProps, nextState) {
    console.log(nextState);
    console.log("5 询问用户是否需要更新");
    if (nextState.number % 2 == 0) {
      return true;
    }
    return false;
  }
  componentWillUpdate() {
    console.log("6 组件将要更新");
  }
  componentDidUpdate() {
    console.log("7 组件已经更新");
  }
  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };
  render() {
    console.log("3组件开始渲染 获取虚拟DOM");
    return (
      <div>
        {/* <TextInput ref={this.classRef} /> */}
        <button onClick={this.handleClick}>点击获取子组件input焦点</button>
        <ChildComponent number={this.state.number} />
      </div>
    );
  }
}
class ChildComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "李浩然",
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props, state);
    return null;
  }
  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps);
  // }
  render() {
    return <div>ChildComponent</div>;
  }
}
// class TextInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.props = props;
//     this.inputRef = React.createRef();
//   }
//   getFocus = () => {
//     this.inputRef.current.focus();
//   };
//   render() {
//     return <input ref={this.inputRef} placeholder="请点击获取焦点并输入内容" />;
//   }
// }
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from "./App";
// import store from './store'
// import {Provider} from 'react-redux'
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
function FunctionComponent() {
  const [fields, setfields] = useState([0]);

  function change(){
    setTimeout(()=>{
      setfields([...fields, 1])
    },100)
    setTimeout(()=>{
      setfields(fields => [...fields, 2])
    },500)
  }
  
  useEffect(() => {
    console.log(123,fields )
  }, [fields]);
  return <div onClick={change}>1</div>;
}
ReactDOM.render(<FunctionComponent />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
