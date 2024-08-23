const express = require('express');
const authenticate = require('../middleware/auth');
const Task = require('../models/Task');
const router = express.Router();


router.post('/tasks', authenticate, async (req, res) => {
    const { title, description, deadline, status, priority } = req.body;

    const task = new Task({
        title,
        description,
        deadline,
        status,
        priority,
        user: req.user.id, // Ensure user ID is assigned here
        //     });

    });

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: 'Error creating task', error: err.message });
    }
});

// router.post('/tasks', authenticate, async (req, res) => {
//     const { title, description, deadline, status, priority } = req.body;

//     if (!req.user || !req.user.id) {
//         return res.status(401).json({ msg: 'Unauthorized' });
//     }

//     const task = new Task({
//         title,
//         description,
//         deadline,
//         status,
//         priority,
//         user: req.user.id, // Ensure user ID is assigned here
//     });

//     try {
//         const newTask = await task.save();
//         res.status(201).json(newTask);
//     } catch (err) {
//         console.error('Error creating task:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// });



// router.get('/tasks', authenticate, async (req, res) => {
//     try {
//         const { status, search, sortBy } = req.query;

//         let query = {};
//         if (status) {
//             query.status = status;
//         }
//         if (search) {
//             query.$or = [
//                 { title: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } }
//             ];
//         }

//         let tasks = await Task.find(query);

//         if (sortBy) {
//             const sortOptions = {};
//             switch (sortBy) {
//                 case 'deadline':
//                     sortOptions.deadline = 1; // Ascending order
//                     break;
//                 case 'priority':
//                     sortOptions.priority = 1; // Ascending order
//                     break;
//                 default:
//                     sortOptions.createdAt = -1; // Default sorting by creation date
//                     break;
//             }
//             tasks = await Task.find(query).sort(sortOptions);
//         }

//         res.json(tasks); // Ensure this is an array of task objects
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

router.get('/tasks', authenticate, async (req, res) => {
    try {
        const { status, search, sortBy } = req.query;

        let query = { userId: req.user._id }; // Only fetch tasks for the logged-in user
        if (status) {
            query.status = status;
        }
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        let tasks = await Task.find(query);

        if (sortBy) {
            const sortOptions = {};
            switch (sortBy) {
                case 'deadline':
                    sortOptions.deadline = 1; // Ascending order
                    break;
                case 'priority':
                    sortOptions.priority = 1; // Ascending order
                    break;
                default:
                    sortOptions.createdAt = -1; // Default sorting by creation date
                    break;
            }
            tasks = await Task.find(query).sort(sortOptions);
        }

        res.json(tasks); // Ensure this is an array of task objects
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});






// router.put('/:id', authenticate, async (req, res) => {
//     try {
//         const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!updatedTask) return res.status(404).json({ msg: 'Task not found' });

//         res.json(updatedTask);
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });


router.put('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user._id }, // Ensure the task belongs to the logged-in user
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).json({ msg: 'Task not found or not authorized' });

        res.json(task);
    } catch (err) {
        res.status(500).send('Server error');
    }
});




// router.delete('/:id', async (req, res) => {
//     try {
//         const task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).json({ msg: 'Task not found' });

//         await Task.findByIdAndDelete(req.params.id);
//         res.json({ msg: 'Task removed' });
//     } catch (err) {
//         console.error(err);
//         res.status(400).json({ message: 'Error deleting task', error: err.message });
//     }
// });


// module.exports = router;



router.delete('/:id', authenticate, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id }); // Ensure the task belongs to the logged-in user
        if (!task) return res.status(404).json({ msg: 'Task not found or not authorized' });

        res.json({ msg: 'Task removed' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error deleting task', error: err.message });
    }
});

module.exports = router;
















// // POST a new task
// router.post('/tasks', authenticate, async (req, res) => {
//     const { title, description, deadline, status, priority } = req.body;

//     const task = new Task({
//         title,
//         description,
//         deadline,
//         status,
//         priority,
//     });

//     try {
//         const newTask = await task.save();
//         res.status(201).json(newTask);
//     } catch (err) {
//         res.status(400).json({ message: 'Error creating task', error: err.message });
//     }
// });






// //   Add Filtering and Sorting Parameters:
// router.get('/tasks', authenticate, async (req, res) => {
//     // res.send('Task Manager API');
//     try {
//         const { status, search, sortBy } = req.query;

//         // Build query
//         let query = {};
//         if (status) {
//             query.status = status;
//         }
//         if (search) {
//             query.$or = [
//                 { title: { $regex: search, $options: 'i' } },
//                 { description: { $regex: search, $options: 'i' } }
//             ];
//         }

//         // Fetch tasks from the database
//         let tasks = await Task.find(query);

//         // Sorting
//         if (sortBy) {
//             const sortOptions = {};
//             switch (sortBy) {
//                 case 'deadline':
//                     sortOptions.deadline = 1; // Ascending order
//                     break;
//                 case 'priority':
//                     sortOptions.priority = 1; // Ascending order
//                     break;
//                 default:
//                     sortOptions.createdAt = -1; // Default sorting by creation date
//                     break;
//             }
//             tasks = await Task.find(query).sort(sortOptions);
//         }

//         res.json(tasks);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });



// // Update a task
// router.put('/:id', authenticate, async (req, res) => {
//     try {
//         let task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).json({ msg: 'Task not found' });

//         task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         res.json(task);
//     } catch (err) {
//         res.status(500).send('Server error');
//     }
// });

// // Delete a task
// router.delete('/:id', authenticate, async (req, res) => {
//     console.log(req.params.id)
//     try {
//         let task = await Task.findById(req.params.id);
//         if (!task) return res.status(404).json({ msg: 'Task not found' });

//         await Task.findByIdAndDelete({_id: req.params.id});
//         res.json({ msg: 'Task removed' });
//     } catch (err) {
//         console.error(err)
//         res.status(400).json(err);
//     }
// });