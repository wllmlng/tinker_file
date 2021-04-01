const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Task = require('./Task');
const User = require('./User');

const ListSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    list: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: Task
    }],
},
    {
        timestamps: true
    }
);

const List = mongoose.model('List', ListSchema);
module.exports = List;