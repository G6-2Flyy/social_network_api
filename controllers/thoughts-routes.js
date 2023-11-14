const router = require("express").Router();
const { User, Thought } = require("../models");

router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const updateUser = await User.findOneAndUpdate({
        username: req.body.username
    },
    {
       $push: {thoughts: newThought._id} 
    })
    res.status(201).json(newThought);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.get("/", async (req, res) => {
    try {
      const thoughts = await Thought.find({})
        .select("-__v");
      res.json(thoughts);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error, please try again! " });
    }
  });



router.get("/:id", async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id).select("-__v");
      res.status(200).json(thought);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Internal server error, please try again! " });
    }
  });





module.exports = router;
