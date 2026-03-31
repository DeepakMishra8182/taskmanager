import Task from "../models/taskSchema.js";

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "title is required" });
    }
    const task = new Task({
      title,
      userId: req.user.id,
    });
    await task.save();
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const task = await Task.find({ userId: req.user.id });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      req.body,
      { new: true },
    );
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: "task not found" });
    }
    return res.status(200).json({ message: "task deleted" });
  } catch (error) {
    return res.status(500).json({ message: "server error" });
  }
};
