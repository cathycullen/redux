
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const TOGGLE_GOAL = 'TOGGLE_GOAL'

//  Action Creators
function addToDoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}
function removeToDoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}
function toggleToDoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}
function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}
function toggleGoalAction(id) {
  return {
    type: TOGGLE_GOAL,
    id,
  }
}

// App code: the stuff that we would write:
// Reducer functions
function todos(state = [], action) {
  switch(action.type) {
    case  ADD_TODO :
      return state.concat(action.todo);
    case  REMOVE_TODO :
      return state.filter((todo) => todo.id !== action.id)
    case  TOGGLE_TODO :
      return state.map((todo) => todo.id !== action.id ? todo :
      Object.assign( {}, todo, { complete: !todo.complete }))
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch(action.type) {
    case  ADD_GOAL :
      return state.concat(action.goal);
    case  REMOVE_GOAL :
      return state.filter((todo) => todo.id !== action.id)
    case  TOGGLE_GOAL:
      return state.map((todo) => todo.id !== action.id ? todo :
      Object.assign( {}, todo, { complete: !todo.complete }))
    default:
      return state;
  }
}

function app(state = {}, action) {
  console.log('app.state: ', state);
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}

// 1. state
// 2. get the state
// 3. listen to changes on state.  add listeners and respond to them.
// 4. update the state.  dispatch will update the state by calling reducer
// think of this as library code.. something we would download from npm.

function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  // subscribe to events
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      // return a function that wheb invoked will unsubscribe
      listeners = listeners.filter((listener) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener())
  }

  // the purpose of dispatch is to update the state
  return{
    getState,
    subscribe,
    dispatch,
  }
}

store = createStore(app);

store.subscribe(() => {
  console.log('current state is: ', store.getState());
})

// now call with action creators
store.dispatch(addToDoAction({
    id: 0,
    name: 'Walk the Dog',
    complete: false,
}));
store.dispatch(addToDoAction({
    id: 1,
    name: 'Wash the Car',
    complete: false,
}));
store.dispatch(addToDoAction({
    id: 2,
    name: 'Go to the Gym',
    complete: false,
}));
store.dispatch(removeToDoAction(2));
store.dispatch(removeToDoAction(1));
store.dispatch(toggleToDoAction(0));
store.dispatch(addGoalAction({
    id: 0,
    name: 'Learn Redux',
    complete: false,
}));
store.dispatch(addGoalAction({
    id: 1,
    name: 'Lose 20 Pounds',
    complete: false,
}));
store.dispatch(removeGoalAction(0));
