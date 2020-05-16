
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

 //helper
 function generateId() {
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
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

///goal action creator
//add goal action
const addGoalAction =(goal)=>({
    type: "ADD_GOAL",
    goal,
})
//remove goal action
const removeGoalAction =(id)=>({
    type: "REMOVE_GOAL",
    id,
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

//goal reducer
function goals(state=[], action) {
    switch (action.type) {
        case "ADD_GOAL":
            return state.concat([action.goal])
        case "REMOVE_GOAL":
            return state.filter(goal => goal.id !== action.id)
        default:
            return state;
    }
}


 //create reducers combine (rootReducer)
 function app(state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

 //create store
 let store = createStore(app)

 store.subscribe(()=>{
    console.log("the new state is : ", store.getState());
    const {goals, todos} = store.getState()
    document.getElementById('todos').innerHTML = ""
    document.getElementById('goals').innerHTML = ""
    todos.forEach(addTodoToDOM)
    goals.forEach(addGoalToDOM)
 })

 //todos
 function addTodo() {
     const input = document.getElementById('todo')
     const name = input.value;
     input.value = "";

     store.dispatch(addTodoAction({
         id:generateId(),
         name,
         complete: false,
         start_at: null
     }))
 }

 function addGoal() {
    const input = document.getElementById('goal')
    const name = input.value;
    input.value = "";

    store.dispatch(addGoalAction({
        id:generateId(),
        name
    }))
}

document.getElementById("todoBtn").addEventListener('click', addTodo)
document.getElementById("goalBtn").addEventListener('click', addGoal)


//remove button
function createRemoveButton(onClick) {
    const removeBtn = document.createElement("button")
    removeBtn.innerHTML = "X"
    removeBtn.setAttribute("class", "btn btn-danger float-right px-5 py-2")
    removeBtn.addEventListener('click', onClick)

    return removeBtn
}

//add todo to dom
function addTodoToDOM(todo) {
    const node = document.createElement('li')
    const text = document.createTextNode(todo.name)

    const removeButton = createRemoveButton(()=>{
        store.dispatch(removeTodoAction(todo.id))
    })

    const complete = document.createElement('span')
    complete.innerHTML = todo.complete ? "<br> Complete" : "<br> InComplete"

    const toggleBtn = document.createElement('button')
    toggleBtn.innerHTML="Toggle"
    toggleBtn.addEventListener('click', ()=>{
        store.dispatch(toggleTodoAction(todo.id))
    })

    node.appendChild(text) 
    node.appendChild(complete)    
    node.appendChild(removeButton)
    node.appendChild(toggleBtn)

    document.getElementById('todos').appendChild(node)
}

//add goal to dom
function addGoalToDOM(goal) {
    const node = document.createElement('li')
    const text = document.createTextNode(goal.name)

    const removeButton = createRemoveButton(()=>{
        store.dispatch(removeGoalAction(goal.id))
    })

    node.appendChild(text)
    node.appendChild(removeButton)

    document.getElementById('goals').appendChild(node)
}
