const User = require("../model/user");
const History = require("../model/history");

exports.getUsers = async(req, res)=>{
  try{
    const users = await User.find();
    res.json(users);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.addUser = async(req, res)=>{
  try {
    const { name, initialCredit } = req.body;

    if (!name) return res.status(400).json({ msg: "Name is required" });

    const existing = await User.findOne({ name });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const user = new User({
      name,
      totalPoints: initialCredit || 0
    });

    await user.save();

    if (initialCredit > 0) {
      await History.create({
        userId: user._id,
        name: user.name,
        pointsClaimed: initialCredit,
        timestamp: new Date(),
      });
    }

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.claimPoints = async(req, res)=> {
  try{
    const { userId } = req.params;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.totalPoints += points;
    await user.save();

    const history = new History({
      userId,
      name: user.name,
      pointsClaimed: points,
    });
    await history.save();

    res.json({ user, points });
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getLeaderboard =async(req, res)=>{
  try{
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};

exports.getHistory = async(req, res)=>{
  try{
    const { userId } = req.params;
    const history = await History.find({ userId }).sort({ timestamp: -1 });
    res.json(history);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
};
