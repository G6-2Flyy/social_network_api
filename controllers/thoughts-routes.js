const router = require("express").Router();
const { restart } = require("nodemon");
const { User, Thought } = require("../models");

router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    const updateUser = await User.findOneAndUpdate(
      {
        username: req.body.username,
      },
      {
        $push: { thoughts: newThought._id },
      }
    );
    res.status(201).json(newThought);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find({}).select("-__v");
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

router.put("/:id", async (req, res) => {
  try {
    const newThought = await Thought.findByIdAndUpdate(req.params.id, req.body);
    if (!newThought) {
      res.status(404).json({ message: "Thought not found!" });
      return;
    }
    res.status(200).json(newThought);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleteThought = await Thought.findByIdAndDelete(req.params.id);
    if (!deleteThought) {
      res.status(404).json({ message: "Thought does not exist! " });
      return;
    }
    res.status(200).json(deleteThought);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error, please try again! " });
  }
});

router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const updateThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $push: { reactions: req.body },
      },
      {
        new: true,
      }
    );
    if (!updateThought) {
        res.status(404).json({message: 'No thought found!'})
        return
    }
  } catch (error) {
    res
    .status(500)
    .json({ message: "Internal server error, please try again! " });

  }
});

router.delete("/:thoughtId/reactions/:reactionId", async (req, res)=> {
    try {
        const updateThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {
              $pull: { reactions: {reactionId: req.params.reactionId} },
            },
            {
              new: true,
            }
          );
          if (!updateThought) {
              res.status(404).json({message: 'No thought found!'})
              return
          }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Internal server error, please try again! " });
      }
})

module.exports = router;
