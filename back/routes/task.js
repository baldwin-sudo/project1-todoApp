import express from "express";
import User from "../models/user.js";
import Task from "../models/task.js";
import { isAuthenticated } from "./auth.js";
const router = express.Router();
router.use(express.json());

router.post("/add/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const existingUser = await User.findById(req.params.id);
    if (existingUser) {
      const task = new Task({ title: title, body: body, user: req.params.id });
      await task.save();
      existingUser.task.push(task);
      existingUser
        .save()
        .then(() =>
          res
            .status(200)
            .json({ message: "successfully created task !", task: task })
        );
    }
  } catch (err) {
    res.status(400).json({ message: "error!" });
  }
});

router.put("/update/:userId/:id", async (req, res) => {
  try {
    
    const existingUser = await User.findOne({_id:req.params.userId});
    if (existingUser) {
      const task = await Task.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
      });
      task
        .save()
        .then(() => res.status(200).json({ message: "successfull update !",task:task }));
    }
  } catch (e) {}
});
router.delete("/delete/:userId/:taskId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const taskId = req.params.taskId;

    // Validate if userId is a valid ObjectId
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    // Check if taskId is provided
    if (!taskId) {
      return res.status(400).json({ error: "TaskId is required" });
    }

    // Validate if taskId is a valid ObjectId
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid taskId" });
    }

    const existingUser = await User.findById(userId);

    if (existingUser) {
      // Use await for the asynchronous operation
      const deletedTask = await Task.findOneAndDelete({ _id: taskId });
      if (deletedTask) {
        await User.updateOne({ _id: userId }, { $pull: { task: taskId } });
        return res.json({ message: "Task deleted successfully" });
      } else {
        return res.status(404).json({ error: "Task not found" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
//TO-DO pass the user id in the url ?
router.get("/list/:id", async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id);
    if (existingUser) {
      const tasks = await Task.find({ user: existingUser._id }).sort({
        createdAt: -1,
      });
      const mappedTasks = tasks.map((task) => ({
        id: task._id,
        title: task.title,
        body: task.body,
      }));

      res.status(200).json({ message: "api response", tasks: mappedTasks });
    }
  } catch (e) {}
});
export default router;
