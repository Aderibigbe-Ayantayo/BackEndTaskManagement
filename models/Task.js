const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
   //  user:        {
   //                  type: mongoose.Schema.Types.ObjectId, ref: 'User',
   //                  required: true,
   //               },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true, // Make the user field required
  },



    title:       {
                    type: String, required: true, 
                 },
    description: { 
                    type: String, 
                    required: true,
                 },
    deadline:    { 
                    type: Date, 
                    required: true,
                 },
    priority:     Number, // You can use 1 for high priority, 2 for medium, etc.

    // status: { type: String, default: 'in-progress' },
    status:      { 
                    type: String, enum: ['completed', 'in-progress'],
                    default: 'in-progress'
                 },
    createdAt:   { type: Date, default: Date.now }

});

module.exports = mongoose.model('Task', TaskSchema);


