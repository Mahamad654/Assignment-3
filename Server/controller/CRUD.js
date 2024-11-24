var express = require('express');
var router = express.Router();
let Workout = require('../model/Trackdata');

function requireAuth(req,res,next)
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// CRUD
// Read Operation --> Get route for the book list
router.get('/', async(req,res,next)=>{
    try{
        const WorkoutList = await Workout.find();
        res.render('workout/list',{
            title: 'Workouts',
            displayName:req.user ? req.user.displayName:'',
            WorkoutList:WorkoutList
        })
    }
    catch(err){
        console.assert.error(err)
        res.render('workout/list',{
            error: 'Error on Server'})
    }
})

// Create Operation --> Get route for Add list
router.get('/add',async(req,res,next)=>{
    try{
        res.render('workout/add', {
            title:"Add workout",
            displayName:req.user ? req.user.displayName:''
        });
    }
    catch (err) {
        console.error(err)
        res.render('workout/list', {
            error: 'Error on Server'})
    }
});
// Read Operation --> Post route for processing the Add  page
router.post('/add',async(req,res,next)=>{
    try{
        let newBook = Workout({
            "Exercise":req.body.Exercise,
            "Date":req.body.Date,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
            "Weight":req.body.Weight,
            "Notes":req.body.Notes

        });
        Workout.create(newBook).then(()=>{
            res.redirect('/Tracker')
        })
    }
    catch(err){
        console.error(err);
        res.render('workout/list',{
            error:'Error on server'})
    }
});
// Update Operation --> Get route for Edit page
router.get('/edit/:id',async(req,res,next)=>{
try{
    const id = req.params.id;
    const BookToEdit = await Workout.findById(id);
    res.render('workout/edit', 
        {
            title:'Edit workout',
            displayName:req.user ? req.user.displayName:'',
            Workout:BookToEdit
        }
    )
}
catch(err){
    console.error(err);
    next(err);
}
});
// Update Operation --> Post route for processing Edit page
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updatedBook = Workout({
            "_id":id,
            "Exercise":req.body.Exercise,
            "Date":req.body.Date,
            "Sets":req.body.Sets,
            "Reps":req.body.Reps,
            "Weight":req.body.Weight,
            "Notes":req.body.Notes

        })
        Workout.findByIdAndUpdate(id,updatedBook).then(()=>{
            res.redirect('/Tracker')
        })
    }
    catch(err){
        console.error(err);
        res.render('workout/list', {
            error:'Error on server'
        })
    }
});
// Delete Operation --> Get route for deletion
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        Workout.deleteOne({_id:id}).then(()=>{
            res.redirect('/Tracker')
        })
    }
    catch(err){
        console.error(err);
        res.render('workout/list', {
            error:'Error on server'
        })
    }
});
module.exports = router;