import User from "../models/User.js";

export default {
  name: "messageCreate",

  async execute(message) {
    if (message.author.bot) return;

    const userId = message.author.id;

    let user = await User.findOne({ userId });

    if (!user) {
      user = await User.create({
        userId,
        xp: 0,
        level: 0,
        lastActive: new Date(),
        lastXp: new Date(),
      });
    }

    console.log(`${message.author.username}: ${message.content}`);

    user.lastActive = new Date();

    const now = Date.now();
    const lastXp = new Date(user.lastXp || 0).getTime();

    if (now - lastXp >= 10000) {
      const gainedXp = Math.floor(Math.random() * 10) + 5;
      user.xp += gainedXp;

      user.lastXp = new Date();

      const newLevel = Math.floor(user.xp / 100);

      if (newLevel > user.level) {
        user.level = newLevel;

        message.channel.send(
          `**${message.author.username} leveled up to level ${newLevel}! Yahoo! 🎉**`,
        );
      }
    }

    await user.save();
  },
};
