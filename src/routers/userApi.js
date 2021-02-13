const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.user);
});

router.post("/", async (req, res) => {
  const { firstName, lastName } = req.body;
  let user = {};
  user.firstName = firstName;
  user.lastName = lastName;
  const userModel = new User(user);
  await userModel.save();
  try {
    await userModel.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.firstName != null) {
    res.user.firstName = req.body.firstName;
  }
  if (req.body.lastName != null) {
    res.user.lastName = req.body.lastName;
  }
  try {
    const updateduser = await res.user.save();
    res.json(updateduser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Deleting One
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user === null)
      return res.status(404).json({ message: "Cannot find subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
