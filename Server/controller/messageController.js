const messageModal = require("../model/messageModal");

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await messageModal.create({
      message: {
        text: message,
      },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.json({
        msg: "Message Added Successfully",
      });

    return res.json({
      msg: "Fail to Add Message.",
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllMessage = async (req, res, next) => {
  // try {
  //   const { from, to } = req.body;
  //   const messages = await messageModal
  //     .find({
  //       users: {
  //         $all: [from, to],
  //       },
  //     })
  //     .sort({ updatedAt: 1 });

  //   const projectMessages = messages.map((msg) => {
  //     return {
  //       fromSelf: msg.sender.toString() === from,
  //       message: msg.text,
  //     };
  //   });

  //   res.json(projectMessages);
  // } catch (error) {
  //   next(error);
  // }

  try {
    const { from, to } = req.body;

    const messages = await messageModal.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};
