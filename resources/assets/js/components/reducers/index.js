import { combineReducers } from 'redux';
import dataReducer from './dataReducer';


export default combineReducers({
	datas: dataReducer
});