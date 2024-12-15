const ConnectionRequest = require("../models/connectionRequest.models");
const User = require("../models/users.models");
const sendConnectionRequest = async(req,res)=>{
    try{
        const senderUserId = req.user._id;
        const receiverUserId = req.params.userid;
        const status = req.params.status;
    
        if(senderUserId == receiverUserId){
            return res.status(400).json({message:"You can't send connection request to yourself"});
        }

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status });
        }

        const receiverUser = await User.findById(receiverUserId);
      if (!receiverUser) {
        return res.status(404).json({ message: "User not found!" });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { senderUserId, receiverUserId },
          { senderUserId: receiverUserId, receiverUserId: senderUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }


        const connectionRequest = new ConnectionRequest({
            senderUserId,
            receiverUserId,
            status
        });
        
        await connectionRequest.save();
        res.status(201).json({
            message: req.user.firstName + " is " + status + " in " + receiverUser.firstName,
            data: {
              sender: senderUserId,
              receiver: receiverUserId,
              status,
            },
          });
          

    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Error sending connection request", error: err.message });

    }
}

const reviewRequest=async(req,res)=>{
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;
  
        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
          return res.status(400).json({ messaage: "Status not allowed!" });
        }
  
        const connectionRequest = await ConnectionRequest.findOne({
          _id: requestId,
          receiverUserId: loggedInUser._id,
          status: "interested",
        });
        if (!connectionRequest) {
          return res
            .status(404)
            .json({ message: "Connection request not found" });
        }
  
        connectionRequest.status = status;
  
        const data = await connectionRequest.save();
  
        res.json({ message: "Connection request " + status, data });
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
}
module.exports = {sendConnectionRequest, reviewRequest}