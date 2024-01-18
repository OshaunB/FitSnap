//Review: useWOrkoutContext-> WorkoutForm-> see post workout code backend-> we have to sync the front end so we use dispatch in workout context-> payload is the json based on the type of dispatch we are using the front end gets synced
import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

// components
import WorkoutDetails from "../components/WorkoutDetails"
import WorkoutForm from "../components/WorkoutForm"

//we want the front end to be in sync withj the back end sop whenever we use communicate a request to the back end we have to update the front end using dispatch

const Home = () => {
  //here we use useworkoutsContext to get workouts and dispatch, we pass workouts to Workout Details
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts')
      const json = await response.json()

      if (response.ok) {
        //here we use dispatch to update the state of the workouts
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }

    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutDetails workout={workout} key={workout._id} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home