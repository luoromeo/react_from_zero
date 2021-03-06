import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Bundle from './../Bundle';
// bundle模型用来异步加载组件
// import Bundle from '../Bundle';
// 导入各种组件
// // 同步加载
import App from '../View/Entry'; // 首页组件
import Home from 'bundle-loader?lazy!../View/Home'; // 首页组件
import Login from 'bundle-loader?lazy!../View/Login'; // 登录页组件

// 异步加载
/*eslint-disable*/
// import loadFrom from 'bundle-loader?lazy!../Component/From'; // 表单组件
// import loadComment from 'bundle-loader?lazy!../Component/Comment'; // 评论组件
// import loadLike from 'bundle-loader?lazy!../Containers/LikeContainer'; // 状态 Like组件
// import loadTodoList from 'bundle-loader?lazy!../Containers/TodoListContainer'; // TodoList组件
/* eslint-enable */

// components load their module for initial visit
// //这里只是给this.props.child传一个方法，最后在Bundle的render里面调用
const createComponent = component => props => (
	  <Bundle load={component}>
	    {Component => <Component {...props} />}
	  </Bundle>
);
// 路由配置
const RouterConfig = () => (
		<div>
				<Route exact path='/' component={App} />
				<Route exact path='/login' component={ createComponent(Login)} />
				<Route exact path='/home' component={ createComponent(Home)} />
		</div>
);
// 导出
export default RouterConfig;
