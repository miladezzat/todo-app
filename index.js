
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
    

    return{
        getState,
        subscribe,        
    }
 }

 let store = createStore()

 store.subscribe(()=>{
     console.log("the state:", store.getState())
 })