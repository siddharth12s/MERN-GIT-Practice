const asynchandler = require('express-async-handler')
const Goal = require('../models/goalmodel')
const User = require('../models/usermodels')



//@desc Get goals
//@route GET /api/goals
//@ access Private
const getgoals = asynchandler(async (req, resp) => {
    const goals = await Goal.find({user: req.user.id});

    resp.json(goals);
})


//@desc Set goals
//@route POST /api/goals
//@ access Private
const setgoals =asynchandler( async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal);
})


//@desc Update goals
//@route PUT /api/goals/:id
//@ access Private
const updategoals = asynchandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id);

    // Check user exists or not
    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true, })

    res.status(200).json(updated);
} ) 

//@desc delete goal
//@route Delete /api/goals/:id
//@ access Private
const deletegoals = asynchandler(async (req, res) => {
    
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error("Goal you're trying to delete does not exist")
    }

    const user = await User.findById(req.user.id);

    // Check user exists or not
    if (!user) {
        res.status(401)
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== user.id) {
        res.status(401);
        throw new Error('User not authorized')
    }

    await goal.remove();

    res.status(200).json({ id: req.params.id });
})
    

module.exports = {
    getgoals,setgoals,updategoals,deletegoals,
}