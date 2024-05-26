// taskRoutes.js
const express = require('express');
const router = express.Router();
const TaskController = require('../controller/tasksController');

router.post('/createTask', TaskController.createTask);
router.get('/fetchAllTasks', TaskController.fetchingAllTasks);
router.get('/fetchOneTask/:id', TaskController.fetchingOneTask);
router.patch('/updateTask/:id', TaskController.updateTask);
router.delete('/deleteTask/:id', TaskController.deleteTask);
router.post('/sendEmail', TaskController.sendEmail);
router.post('/sendSms', TaskController.sendSms);

module.exports = router;