const express = require("express")
const router = express.Router();
const passport = require("passport");
// const validateQuestionInput = require('../../validation/question');
// const validateResponse = require('../../validation/response')
const List = require('../../models/List');
const Task = require('../../models/Task');
const User = require('../../models/User');


//retreiving all the lists
router.get('/',(req,res) => {
    List.find()
    .populate('tasks')
    .sort({timestamps:-1})
    .then(lists => {res.json(lists)})
    .catch(err => res.status(404).json(err));
});


//retreive a list from user
router.get('/:id',(req,res) => {
    List.find()
        .populate('tasks')
        .sort({timestamps:-1})
        .then(lists => {
            const listArr = [];
            lists.forEach(list => {
                // console.log('list',typeof list.user.toString())
                // console.log('req.body.user',typeof req.params.id)
                // console.log( list.user.toString() === req.params.id)
                if(req.params.id === list.user.toString()){
                    listArr.push(list);
                }
            })
            res.json(listArr)
        })
});


//posting lists
router.post('/', passport.authenticate('jwt',{session:false}), async (req,res) =>{
              
    const newList = new List({
        user: req.body.user,
        list: req.body.list
    });
    newList.save().then(list => res.json(list))
    }  
);


router.patch("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {
    try {
        let list = await List.findById(req.params.id);
        
            if (req.body.list) {
                list.list = req.body.list
            }
            
            await list.save()
            res.send(list)

	} catch(err){
        res.status(404).json({
            error: "List doesn't exist!"
        })
    }
})



//deleting a list
router.delete("/:id", passport.authenticate('jwt',{session:false}), async (req, res) => {

    const list = await List.findOne({ _id: req.params.id })

    if(list) {
       
            Task.deleteMany({ list: req.params.id }).then(function(){ 
                console.log("Data deleted"); // Success 
            }).catch(function(error){ 
                console.log(error); // Failure 
            }); 

            List.findByIdAndDelete(req.params.id)
            .then(() => res.json(list))
            .catch(err => res.status(404).json(err))
    } else {
        res.json("list not found")
    }
})

module.exports = router;


