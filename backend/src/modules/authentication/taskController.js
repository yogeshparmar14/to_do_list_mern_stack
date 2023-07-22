const userModel = require("../../db/models/taskSchema")

const addTask = async (req, res) => {
    console.log(req.body)
    console.log("req.user",req.user)
    const { title, description, completed,priority } = req.body
    if (!title || !description)
        return res.send({ "message": "All fields are required", "status": 400 })
    try {

        const doc = new userModel({
            title: title,
            description: description,
            completed: completed,
            useremail:req.user.email,
            priority:priority

        })
        await doc.save()
        res.send({
            "message": `${title} is added successfully!`, "status": 200,
            "data": {
                "title": `${title}`,
                "description": `${description}`,
            }
        })
    } catch (error) {
        console.log(error)
        res.send({ "message": "Unable to add task", "status": 403 })
    }
}

const getAllTask = async (req, res) => {
    try {
        console.log("req.user",req.user.email)
        const data = await userModel.find({useremail:req.user.email});
        res.json(data)
    }
    catch (error) {
        res.status(403).json({ "message": "Unable to task" })
    }
}

const updateTask = async (req, res) => {
        const id = req.params.id;
        userModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot update task with id=${id}. Maybe Tutorial was not found!`
                    });
                } else res.send({ message: "Task was updated successfully.", status:200 });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating Taskl with id=" + id
                });
            });
}

const deleteTask = async (req, res) => { 
        const id = req.params.id;
        userModel.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
                    });
                } else {
                    res.send({
                        message: "Task was deleted successfully!",
                        status:200
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Could not delete Task with id=" + id
                });
            });
}

module.exports = { addTask, getAllTask, updateTask, deleteTask }