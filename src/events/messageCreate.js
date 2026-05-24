import User from "../models/User.js";

// check user inactivity of last message , also runs every message

export default {
  name: "messageCreate",

  async execute(message) {
    if (message.author.bot) return;

    console.log(`${message.author.username}: ${message.content}`);

    const userId = message.author.id;
    await User.findOneAndUpdate(
      { userId: message.author.id },
      {
        userId: message.author.id,
        lastActive: new Date(),
      },
      { upsert: true, returnDocument: "after" },
    );
  },
};
