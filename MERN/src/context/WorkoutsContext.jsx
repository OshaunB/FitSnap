import { createContext, useReducer } from 'react'

export const WorkoutsContext = createContext()

//action is the second argument in the dispatch function
export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        workouts: [action.payload, ...state.workouts] 
      }
    case 'DELETE_WORKOUT':
      return { 
        workouts: state.workouts.filter((w) => w._id !== action.payload._id) 
      }
    default:
      //state is the workouts we want to display
      return state
  }
}

//first create your context provider, providers provide the context to the 
//components they are wrapping, they are called children
//in this case we wrapping the app in the main.jsx file(go check)
//this way all components should have access to the context

//okay so, state is the data and we set the initial value of this object data to null, its an object, property workout. 
export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { 
    workouts: null
  })
  
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </WorkoutsContext.Provider>
  )
}


