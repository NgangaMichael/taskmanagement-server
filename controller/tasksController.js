const Task = require('../models/tasksModel');
const { sendEmail, sendSms } = require('../utils/notification');

class TaskController {
    static async createTask(req, res) {
        try {
            const { phone, complainant, issue, email, assignee, category } = req.body;
            const newTask = await Task.create({ phone, complainant, issue, email, assignee, category });
            await sendSms(phone, `New task created: ${issue}`);
            res.status(200).json({ message: 'New Task created Successfully', Task: newTask });
        } catch (error) {
            console.error('Error creating Task:', error);
            res.status(500).json({ message: 'Error creating Task', error: error.message });
        }
    }

    static async fetchingAllTasks(req, res) {
        try {
            const tasks = await Task.findAll({});
            res.json(tasks);
        } catch (error) {
            console.error('Error fetching all Tasks:', error);
            res.status(500).json({ message: 'Error fetching all Tasks', error: error.message });
        }
    }

    static async fetchingOneTask(req, res) {
        try {
            const { id } = req.params;
            const task = await Task.findByPk(id);
            if (!task) {
                return res.status(404).json({ message: 'Task not found' });
            }
            res.json(task);
        } catch (error) {
            console.error('Error fetching one Task:', error);
            res.status(500).json({ message: 'Error fetching one Task', error: error.message });
        }
    }

    static async updateTask(req, res) {
        try {
            const { id } = req.params;
            const { phone, complainant, issue, email, assignee, category } = req.body;
            const [updatedCount] = await Task.update({ phone, complainant, issue, email, assignee, category }, { where: { id } });
            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Task not found for updating' });
            }
            await sendSms(phone, `Task updated: ${issue}`);
            res.status(200).json({ message: 'Task Updated Successfully' });
        } catch (error) {
            console.error('Error updating Task:', error);
            res.status(500).json({ message: 'Error updating Task', error: error.message });
        }
    }

    static async deleteTask(req, res) {
        try {
            const { id } = req.params;
            const deletedCount = await Task.destroy({ where: { id } });
            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Task not found for deleting' });
            }
            res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting Task:', error);
            res.status(500).json({ message: 'Error deleting Task', error: error.message });
        }
    }

    static async sendEmail(req, res) {
        try {
            const { to, subject, text } = req.body;
            await sendEmail(to, subject, text);
            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email', error: error.message });
        }
    }

    static async sendSms(req, res) {
        try {
            const { to, body } = req.body;
            await sendSms(to, body);
            res.status(200).json({ message: 'SMS sent successfully' });
        } catch (error) {
            console.error('Error sending SMS:', error);
            res.status(500).json({ message: 'Error sending SMS', error: error.message });
        }
    }
}

module.exports = TaskController;
