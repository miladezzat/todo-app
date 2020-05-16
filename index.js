
 function createStore(){
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
    
    const dispatch = (action)=>{
        state = reducer(state, action)
        listeners.forEach(listener=>listener())
    }
    return{
        getState,
        subscribe, 
        dispatch,       
    }
 }


 function todos = (state=[],action){
     switch
 }

 let store = createStore()

 store.subscribe(()=>{
     console.log("the state:", store.getState())
 })
 
 store.dispatch(addtodo)

 const addtodo = {
     type: "ADD_TODO",
     todo:{
         id:1,
         name: "Eating",
         complete: false,
         state: null,
     }
 } 