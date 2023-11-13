const router = require("express").Router();
const { User, Thought } = require("../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v");
    res.json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const users = await User.findById(req.params.id)
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v");
    res.json(users);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    if (!deleteUser) {
      res.status(400).json({ message: "User does not exist! " });
      return;
    }
    const deleteThoughts = await Thought.deleteMany({
      username: deleteUser.username,
    });
    res.status(200).json(deleteUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

module.exports = router;
