import User from "../models/User.js";

export async function checkInactive(guild) {
  const sevenDays = 7 * 24 * 60 * 60 * 1000; //7 days inactive
  const now = Date.now();

  const users = await User.find();

  for (const user of users) {
    if (now - user.lastActive > sevenDays) {
      try {
        const member = await guild.members.fetch(user.userId);
        await member.kick("Inactive for 7 days ");
      } catch (err) {
        console.log("Can't kick:", user.userId);
      }
    }
  }
}
