import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as userReducer } from "./userReducer/reducer";
import { authReducer } from "./authReducer/reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({ authReducer, userReducer });
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
