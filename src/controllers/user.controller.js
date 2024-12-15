const ConnectionRequest = require("../models/connectionRequest.models");
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

const User = require('../models/users.models');
const feed = async(req,res)=>{
    try {
        const loggedInUser = req.user;
    
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
    
        const connectionRequests = await ConnectionRequest.find({
          $or: [{ senderUserId: loggedInUser._id }, { receiverUserId: loggedInUser._id }],
        }).select("senderUserId receiverUserId");
    
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((req) => {
          hideUsersFromFeed.add(req.senderUserId.toString());
          hideUsersFromFeed.add(req.receiverUserId.toString());
        });

        const users = await User.find({
          $and: [
            { _id: { $nin: Array.from(hideUsersFromFeed) } },
            { _id: { $ne: loggedInUser._id } },
          ],
        })
          .select(USER_SAFE_DATA)
          .skip(skip)
          .limit(limit);
    
        res.json({ data: users });
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
}
//pending Requests
const connectionsReceived = async(req,res)=>{
    try{
        const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        receiverUserId: loggedInUser._id,
      status: "interested"})
      .populate("senderUserId", USER_SAFE_DATA);
    // }).populate("senderUserId", ["firstName", "lastName"]);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });

    }
    catch(err){
        console.error(err);
    }
}

const connections = async(req,res)=>{
    try{
        const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { receiverUserId: loggedInUser._id, status: "accepted" },
        { senderUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderUserId", USER_SAFE_DATA)
      .populate("receiverUserId", USER_SAFE_DATA);


    const data = connectionRequests.map((row) => {
      if (row.senderUserId._id.toString() === loggedInUser._id.toString()) {
        return row.receiverUserId;
      }
      return row.senderUserId;
    });

    res.json({ data });
}
    catch(err){
        console.error(err);
    }
}


module.exports = {feed, connectionsReceived, connections}
