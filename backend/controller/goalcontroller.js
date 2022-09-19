const asynchandler = require('express-async-handler')



//@desc Get goals
//@route GET /api/goals
//@ access Private
const getgoals = asynchandler(async (req, resp) => {
    resp.json({message :'Get goals'})
})


//@desc Set goals
//@route POST /api/goals
//@ access Private
const setgoals =asynchandler( async(req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }

    res.status(200).json({message :'Set goal'});
})


//@desc Update goals
//@route PUT /api/goals/:id
//@ access Private
const updategoals = asynchandler(async (req, res) => {
    res.status(200).json({
        message: `Update goal ${req.params.id}`
    });
} ) 

//@desc delete goal
//@route Delete /api/goals/:id
//@ access Private
    const deletegoals = asynchandler(async (req, res) => {
        res.status(200).json({
            message: `delete goal ${req.params.id}`
        });
})
    

module.exports = {
    getgoals,setgoals,updategoals,deletegoals,
}