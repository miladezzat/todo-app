
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