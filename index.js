
 function createStore(reducer){
    // * 1-state tree
    // * 2- a way to get state
    // * 3- a way to listen changes of state
    // * 4- a way to update state (dispatch)

    let state
    let listeners = []
    const getState =()=> state;

    const subscribe = (listener)=>{
        listeners.push(listener)
    }

    const dispatch =(action)=>{
        state = reducer (state, action);
        listeners.forEach(listener=> listener())
    }

    return{
        getState,
        subscribe, 
        dispatch           
    }
 }

 //action creator
 //create todo
const addTodoAction =(todo)=>({
    type: "ADD_TODO",
    todo
})
 //remove  todo
 const removeTodoAction =(id)=>({
    type: "REMOVE_TODO",
    id
})
 //toggle todo
 const toggleTodoAction =(id)=>({
    type: "TOGGLE_TODO",
    id
})
 //start todo
 const startTodoAction =(id)=>({
    type: "START_TODO_AT",
    id
})

 //reducer
 function todos(state=[], action) {
     switch (action.type) {
         case "ADD_TODO":
             return state.concat([action.todo])
        case "REMOVE_TODO": 
            return  state.filter(todo => todo.id !== action.id)
        case "TOGGLE_TODO":
                return state.map(todo => todo.id !== action.id ? todo : Object.assign({},todo, {complete: !todo.complete}))
        case "START_TODO_AT": 
            return state.map(todo => todo.id !== action.id ? todo : Object.assign({}, todo, {start_at: Date.now()}))
        
         default:
             return state
     }
 }

 //create store

 let store = createStore(todos)

 store.subscribe(()=>{
     console.log("state is : ", store.getState())
 })
 store.dispatch(addTodoAction({id: 1, name:"Eating", complete: false, start_at: null}))
 store.dispatch(addTodoAction({id: 2, name:"Eating", complete: false, start_at: null}))
 store.dispatch(addTodoAction({id: 3, name:"Eating", complete: false, start_at: null}))

 store.dispatch(toggleTodoAction(1))
 store.dispatch(removeTodoAction(2))

 store.dispatch(startTodoAction(3))