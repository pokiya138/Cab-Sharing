const chatModel = require("../model/chatModel");
const chat = chatModel.chat;
const venderController = require("../model/venderModel");
const vender = venderController.vender;
const userModel = require("../model/userModel");
const user = userModel.user;
const mongoose = require("mongoose");

//Send Message Api
exports.sendMessage = async (req, res) => {
  try {
    const data = new chat({
      sender_id: req.body.sender_id,
      receiver_id: req.body.receiver_id,
      message: req.body.message,
      createAt: new Date(),
      status: 0,
    });
    const result = await chat(data).save();
    if (result) {
      return res.json({
        success: 1,
        message: "Message send successfully.",
        result,
      });
    } else {
      return res.json({
        success: 0,
        message: "Message not send.",
      });
    }
  } catch (error) {
    return res.send({
      success: 0,
      message: "Error in message send.",
    });
  }
};

//Get Message Api By User
exports.getMessageByUser = async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const message = await chat.find({
    $and: [
      { $or: [{ sender_id: sender_id }, { sender_id: receiver_id }] },
      { $or: [{ receiver_id: sender_id }, { receiver_id: receiver_id }] },
    ],
  });
  const info = await vender.findOne({ _id: receiver_id });
  if (message) {
    return res.json({
      success: 1,
      message: "Chat",
      info,
      data: message,
    });
  } else {
    return res.json({
      success: 0,
      message: "Chat is not found.",
    });
  }
};

//Get Message Api By Vender
exports.getMessageByVender = async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const message = await chat.find({
    $and: [
      { $or: [{ sender_id: sender_id }, { sender_id: receiver_id }] },
      { $or: [{ receiver_id: sender_id }, { receiver_id: receiver_id }] },
    ],
  });
  const info = await user.findOne({ _id: receiver_id });
  if (message) {
    return res.json({
      success: 1,
      message: "Chat",
      info,
      data: message,
    });
  } else {
    return res.json({
      success: 0,
      message: "Chat is not found.",
    });
  }
};

//Update Status Code
exports.updateReadMessage = async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const message = await chat.updateMany(
    { $and: [{ sender_id: receiver_id }, { receiver_id: sender_id }] },
    { $set: { status: 1 } }
  );
  if (message) {
    return res.json({
      success: 1,
      message: "Message seen.",
    });
  } else {
    return res.json({
      success: 0,
      message: "Chat is not found.",
    });
  }
};

//Unread Message
exports.getUnreadMessage = async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  const message = await chat.find({
    $and: [
      { $or: [{ sender_id: sender_id }, { sender_id: receiver_id }] },
      { $or: [{ receiver_id: sender_id }, { receiver_id: receiver_id }] },
    ],
  });
  if (message) {
    const b = [];
    for (const a of message) {
      if (a.status == 0) {
        b.push(a.status);
      }
    }
    return res.json({
      success: 1,
      unread: b.length,
    });
  } else {
    return res.json({
      success: 0,
      message: "Chat is not found.",
    });
  }
};

//Get chat List
exports.getList = async (req, res) => {
  try {
    const id = req.params.id;
    const pipeline = [
      {
        $match: {
          sender_id: id,
        },
      },
      {
        $group: {
          _id: "$receiver_id",
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];
    const message = await chat.find({});
    if (message) {
      const reversedMessages = message.reverse();
      return res.json({
        success: 1,
        message: "List",
        message: reversedMessages,
      });
    } else {
      return res.json({
        success: 0,
        message: "Not found list.",
      });
    }
  } catch (error) {
    return res.json({
      success: 0,
      message: "Error in code.",
      error,
    });
  }
};

//User List Get
exports.userGetList = async (req, res) => {
  const id = req.body.id;
  const message = await chat.find({
    $or: [{ sender_id: id }, { receiver_id: id }],
  });
  if (message) {
    const abc = [];
    for (const a of message.reverse()) {
      if (
        !abc.find((e) => {
          (a.sender_id == e.sender_id && a.receiver_id == e.receiver_id) ||
            (a.sender_id == e.receiver_id && a.receiver_id == e.sender_id);
        })
      ) {
        abc.push(a);
      } else {
      }
    }
    if (abc) {
      return res.json({
        success: 1,
        message: "Chat",
        data: abc,
      });
    } else {
    }
  } else {
    return res.json({
      success: 0,
      message: "Chat is not found.",
    });
  }
};
