const express = require("express")
const router = express.Router();
const passport = require("passport");
// const validateQuestionInput = require('../../validation/question');
// const validateResponse = require('../../validation/response')
const Task = require('../../models/Task');
const List = require('../../models/List');
const User = require('../../models/User');


//retreiving all the tasks
router.get('/',(req,res) => {
    
    Task.find()
    .sort({timestamps:-1})
    .then(tasks => {res.json(tasks)})
    .catch(err => res.status(404).json(err));
});

//retreiving one task
router.get('/:id',(req,res)=>{
    Task.findById(req.params.id)
    .then(task => res.json(task))
    .catch(err => res.status(404).json("task not found"))
})



//posting tasks
router.post('/', passport.authenticate('jwt',{session:false}), async (req,res) =>{
        const newTask = new Task({
            list: req.body.list,
            task: req.body.task,
            description: req.body.description,
            status: req.body.status
        });
        
        newTask.save().then(task => {
            List.findById(req.body.list)
                .then(list => {
                    list.tasks.push(task.id);
                    list.save();
                });
            return res.json(task) 
        }) 
        
      }
    
);

//updating tasks
router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

            if (req.body.task) {
                task.task = req.body.task
            }

            if (req.body.status) {
                task.status = req.body.status
            }
            
            await task.save()
            res.send(task)

	} catch(err){
        res.status(404).json({
            error: "Task doesn't exist!"
        })
    }
})



//deleting a task
router.delete("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {

    const task = await Task.findOne({ _id: req.params.id })

    if(task) {
            Task.findByIdAndDelete(req.params.id)
            .then(() => res.json(task))
            .catch(err => res.status(404).json(err))
    } else {
        res.json("task not found")
    }
})


//! comments
//creating a comment to a task
router.post("/:id/comments", passport.authenticate('jwt',{session:false}), async (req, res) => {
    
    let task = await Task.findById(req.params.id)

    if (task) {
            task.comments.push(Object.assign(req.body, {user: req.user.id}))
            task.save( function (err) {
                if (!err) res.json(task)
            })
        }
})

//changing a comment of a task
router.patch("/:id/comments/:commentId", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        let comment = await task.comments.id(req.params.commentId)
        
            if (req.body.comment) {
                comment.comment = req.body.comment
            }
             
            await task.save()
            res.send(comment)

	} catch(err){
        res.status(404).json({
            error: "Comment doesn't exist!"
        })
    }
})


//deleting a comment from a task
router.delete("/:id/comments/:commentId", passport.authenticate('jwt',{session:false}), async (req, res) => {
    let task = await Task.findById(req.params.id);
    let comment = await task.comments.id(req.params.commentId)


    // if(task ) {
    //     // console.log(typeof task.comments[0]._id) //object
    //     // console.log(typeof req.params.commentId) //string
    //     for(let i = 0; i < task.comments.length; i ++){
    //         if ( task.comments[i]._id.toString() === req.params.commentId){
    //             // console.log('@@@@@@@@@comment@@@', task.comments[i])
    //             task.comments[i].remove();
    //         }
    //     }
    //     // task.comments.id(req.params.commentId).remove();
    //     task.save(function (err) {
    //         res.json(task)
    //         // res.json(comment)
    //     })
    // } else {
    //     res.json("task does not exist.")
    // }

    //using mongoose built in '.id' over above workaround
    if(task && comment) {
        task.comments.id(req.params.commentId).remove();
        task.save(function (err) {
            res.json(comment)
        })        
        
    } else {
        res.json("task and/or comment does not exist.")
    }
})

module.exports = router;


