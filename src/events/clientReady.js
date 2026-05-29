import { checkInactive } from "../tasks/inactivityCheck.js";
import User from "../models/User.js";

export default {
  name: "clientReady",
  once: true,

  async execute(client) {

    console.log(`${client.user.tag} is online`);

    const guild = client.guilds.cache.first();

    if (!guild) return;

    // FETCH ALL MEMBERS
    await guild.members.fetch();

    // FIX OLD USERS WITHOUT warned FIELD
    await User.updateMany(
      { warned: { $exists: false } },
      { $set: { warned: false } }
    );

    // ADD ALL MEMBERS TO DB
    for (const [id, member] of guild.members.cache) {

      if (member.user.bot) continue;

      const existingUser = await User.findOne({
        userId: id,
      });

      // CREATE NEW USER
      if (!existingUser) {

        await User.create({
          userId: id,
          xp: 0,
          level: 0,
          warned: false,
          lastXp: new Date(),

          // START GHOST USERS AS 2 DAYS INACTIVE
          lastActive: new Date(
            Date.now() - (2 * 24 * 60 * 60 * 1000)
          ),
        });

        console.log(`Added ${member.user.username} to DB`);
      }
    }

    await checkInactive(guild)

    // CHECK EVERY 6 HOURS
    setInterval(async () => {

      await checkInactive(guild);

    }, 1000 * 60 * 60 * 6);
  },
};