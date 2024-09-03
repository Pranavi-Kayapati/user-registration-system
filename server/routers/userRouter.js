const express = require("express");
const User = require("../modals/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password, phone, profession } = req.body;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const numericalRegex = /[0-9]/;
  const phoneRegex = /^\d{10}$/;

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must have at least 6 characters." });
  }

  if (!uppercaseRegex.test(password)) {
    return res
      .status(400)
      .json({ error: "Password must have at least one uppercase letter." });
  }

  if (!specialCharRegex.test(password)) {
    return res
      .status(400)
      .json({ error: "Password must have at least one special character." });
  }

  if (!numericalRegex.test(password)) {
    return res
      .status(400)
      .json({ error: "Password must have at least one number." });
  }

  if (!phoneRegex.test(phone)) {
    return res
      .status(400)
      .json({ error: "Phone number must be exactly 10 digits." });
  }

  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      profession,
    });
    await user.save();
    res.status(201).json({ message: "User successfully registered", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User does not exist, please register." });
    }

    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userID: user._id, user: user.name }, "user", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "User logged in", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.put("/update/:id", async (req, res) => {
  const { name, email, phone, profession } = req.body;
  const userId = req.params.id;

  try {
    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.profession = profession || user.profession;

    await user.save();
    res.status(200).json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

userRouter.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = userRouter;
