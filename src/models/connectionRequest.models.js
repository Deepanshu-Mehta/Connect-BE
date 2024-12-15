const {mongoose,  Schema} = require("mongoose");
const connectionRequestSchema = new Schema({
    senderUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  { timestamps: true }
);




connectionRequestSchema.index({ senderUserId: 1, receiverUserId: 1 });

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    // Check if the fromUserId is same as toUserId
    if (connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)) {
        throw new Error("Cannot send connection request to yourself!");
    }
    next();
});
  
const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
  );

module.exports = ConnectionRequestModel;