import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  //storage,
}

const store = createStore(reducer)

export default store;