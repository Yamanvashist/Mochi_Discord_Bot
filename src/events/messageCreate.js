import User from "../models/User.js";

export default {
  name: "messageCreate",

  async execute(message) {

    if (message.author.bot) return;

    const userId = message.author.id;

    let user = await User.findOne({ userId });

    // CREATE USER IF NOT EXISTS
    if (!user) {

      user = await User.create({
        userId,
        xp: 0,
        level: 0,
        warned: false,
        lastXp: new Date(),
        lastActive: new Date(),
      });
    }

    // UPDATE ACTIVITY
    user.lastActive = new Date();

    // RESET WARNING IF USER RETURNS
    user.warned = false;

    // =========================
    // XP SYSTEM
    // =========================

    const now = Date.now();

    const lastXp = new Date(user.lastXp || 0).getTime();

    // GIVE XP EVERY 10 SEC
    if (now - lastXp >= 60000) {

      const gainedXp = Math.floor(Math.random() * 4) + 2;

      user.xp += gainedXp;

      user.lastXp = new Date();

      const newLevel = Math.floor(user.xp / 100);

      // LEVEL UP
      if (newLevel > user.level) {

        user.level = newLevel;

        message.channel.send(
          `🎉 **${message.author.username} leveled up to level ${newLevel}!**`
        );
      }
    }

    await user.save();
  },
};