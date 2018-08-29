//redux wraps "store" in a class

//store: responsible for maintaining state
//exposes getter via getState()

//can only be updated by using dispatch()
//can add listeners that get invoked when state changes

// takes the previous state and an update and applies teh update
// returns the new state

// should be a pure function
// no side effects
// should be immutable
// return a new object

import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer';

const persistConfig = {
  key: 'root',
  //storage,
}

const store = createStore(reducer)
console.log(store)

export default store;