import User from "../models/User.js";
import { EmbedBuilder, Colors } from "discord.js";

export async function checkInactive(guild) {
  const threeDays = 3 * 24 * 60 * 60 * 1000;
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const now = Date.now();

  const users = await User.find();

  const updateChannel = guild.channels.cache.find(
    (c) => c.name === "server-updates",
  );

  for (const user of users) {
    const inactiveTime = now - user.lastActive;

    let member;

    // FETCH MEMBER
    try {
      member = await guild.members.fetch(user.userId);
    } catch {
      continue;
    }

    if (!member) continue;

    // KICK AFTER 7 DAYS
    if (inactiveTime >= sevenDays) {
      if (updateChannel) {
        const kickEmbed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setTitle("🚨 Member Removed")
          .setDescription(
            `${member.user.username} was removed for being inactive for 7 days.`,
          )
          .setFooter({
            text: "Server Activity System",
          })
          .setTimestamp();

        await updateChannel.send({
          content: `🚨 ${member}`,
          embeds: [kickEmbed],
        });
      }

      try {
        await member.kick("Inactive for 7 days");

        console.log(`${member.user.username} kicked for inactivity`);

        // REMOVE USER FROM DB
        await User.deleteOne({
          userId: user.userId,
        });
      } catch (err) {
        console.log(`Failed to kick ${member.user.username}`, err);
      }

      continue;
    }

    // WARNING AFTER 3 DAYS
    if (inactiveTime >= threeDays && inactiveTime < sevenDays && !user.warned) {
      if (updateChannel) {
        const warningEmbed = new EmbedBuilder()
          .setColor(Colors.Yellow)
          .setTitle("⚠️ Inactivity Warning")
          .setDescription(
            `${member.user.username} has been inactive for 3 days.`,
          )
          .addFields({
            name: "Reminder",
            value:
              "Please stay active in the server to avoid automatic removal after 7 days.",
          })
          .setFooter({
            text: "Server Activity System",
          })
          .setTimestamp();

        await updateChannel.send({
          content: `${member}`,
          embeds: [warningEmbed],
        });
      }

      //  DM
      await member
        .send(
          "⚠️ You’ve been inactive for 3 days. Stay active or you may be removed after 7 days.",
        )
        .catch(() => {});

      user.warned = true;

      await user.save();
    }
  }
}
