import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import { combineReducers } from 'redux-immutablejs';
import thunk from 'redux-thunk';
// import Immutable from 'immutable';
import reducer from '../Reducer/index';
// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const state = Immutable.fromJS({});
// 创建一个 Redux store 来以存放应用中所有的 state，应用中应有且仅有一个 store。
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
export default store;


// export default function configureStore(initialState) {
//   // const store = createStore(rootReducer, initialState);
//   // const store = createStoreWithMiddleware(reducer); old
//   console.log(initialState);
//   let store;
//   if(!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__) && process.env.NODE_ENV == 'development'){
//       store = createStore(reducer,initialState)
//   }else{
//     //   store = createStore(reducer,initialState,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//       store = createStore(reducer,initialState,composeEnhancers(applyMiddleware(thunk)))
//   }
//   return store;
// }
