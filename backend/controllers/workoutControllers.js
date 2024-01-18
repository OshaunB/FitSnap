const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get all the workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts);
}

//get a single workout
const getWorkout = async (req, res) => {
    //how we get the id
    const { id } = req.params;

    //if its not a mongoose provided ID then throw an error, does not exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such workout"});
    }

    const workout = await Workout.findById(id);

    if(!workout) {
        return res.status(404).json({ error: 'Not such workout' });
    }

    res.status(200).json(workout);
}

//create a new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }

    if(!load){
        emptyFields.push('load');
    }

    if (!reps){
        emptyFields.push('reps');
    }

    if (emptyFields.length > 0){
        return res.status(404).json({error: 'Please fill in all fields'}, emptyFields);
    }

    //add doc to db
    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(err){
        res.status(400).json({err: err.message})
    }
}

//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    //if its not a mongoose provided ID then throw an error, does not exist
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: "No such workout"});
    }

    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({ error: "No such workout"});
    }

    res.status(200).json(workout);
}

// Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' });
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        // whatever properties on the body will be updated in the object
        ...req.body
    });

    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(workout);
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}