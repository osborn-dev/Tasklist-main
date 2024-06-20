const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false,
    },
    dueDate: {
        type: Date
    }
})
const TodoModel = mongoose.model('task', TodoSchema)

module.exports = TodoModel