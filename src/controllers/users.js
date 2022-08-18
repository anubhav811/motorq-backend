const User = require("../models/users");
const Event = require("../models/events");

const home = (req, res) => {
  try {
    res.status(200).send({
      message: "Welcome to the users page",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const register = async (req, res) => {
  const user = new User(req.body);
  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    await user.generateAuthToken();
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const registerEvent = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.events.push(req.body.eventId);
    await user.save();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getEventsList = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const events = await Event.find({ _id: { $in: user.events } });
    res.status(200).send(events);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const logout = async (req, res) => {
  try {
    req.user.token = "";
    await req.user.save();
    res.status(200).send({
      message: "Logout Successful",
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  home,
  register,
  login,
  registerEvent,
  getEventsList,
  logout,
};
