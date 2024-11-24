// MVC --> Model, View, Controller (Routers)
let mongoose = require('mongoose');
// model class
let WorkoutModel = mongoose.Schema({
    Exercise:String,
    Date:String,
    Sets:String,
    Reps:String,
    Weight:String,
    Notes:String
},
{
    collection:"workout"
    // INFR3120_100829472
}
)
module.exports = mongoose.model('Workout',WorkoutModel)