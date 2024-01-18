import { WorkoutsContext } from "../context/WorkoutsContext"
import { useContext } from "react"

//use useWorkoutsContext in components that wanna use the workoutcontext
//go check Home.jsx
export const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}