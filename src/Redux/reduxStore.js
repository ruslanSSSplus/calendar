import {applyMiddleware, combineReducers, legacy_createStore as createStore, compose} from "redux";
import thunkMiddleware from 'redux-thunk'
import calendarReducer from "./Reducers/calendarReducer";



let rootReducer = combineReducers({
      calendar: calendarReducer,

  })


const store = createStore(rootReducer, compose(applyMiddleware(thunkMiddleware)));


export default store

