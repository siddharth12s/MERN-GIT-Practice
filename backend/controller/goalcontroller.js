const asynchandler = require('express-async-handler')
const Goal = require('../models/goalmodel')


//@desc Get goals
//@route GET /api/goals
//@ access Private
const getgoals = asynchandler(async (req, resp) => {
    const goals = await Goal.find();

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
        text: req.body.text
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

    await goal.remove();

    res.status(200).json({ id: req.params.id });
})
    

module.exports = {
    getgoals,setgoals,updategoals,deletegoals,
}