import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
//after importing useWorkoutsContext, you can use the dispatch function

//date fns
// import formatDistanceToNow from 'date-fns/formsDistanceToNow'


const WorkoutDetails = ({ workout }) => {
  //check home component
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      //updating it in the front end, so that it can be syncronized properly with the backend
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails