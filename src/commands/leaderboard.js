import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import User from "../models/User.js";

export default {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Show top XP users"),

  async execute(interaction) {
    const topUsers = await User.find().sort({ xp: -1 }).limit(10);

    if (!topUsers.length) {
      return interaction.reply({
        content: "No data yet",
        ephemeral: true,
      });
    }

    let description = "";

    for (let i = 0; i < topUsers.length; i++) {
      const user = topUsers[i];

      let memberName = "Unknown";

      try {
        const member = await interaction.guild.members.fetch(user.userId);
        memberName = member.user.username;
      } catch {
        memberName = "Left User";
      }

      description += `**${i + 1}.** ${memberName} — XP: ${user.xp} | Level: ${user.level}\n`;
    }

    const embed = new EmbedBuilder()
      .setTitle("XP Leaderboard")
      .setDescription(description)
      .setColor(Colors.Gold)
      .setFooter({ text: "Keep chatting to climb" });

    await interaction.reply({ embeds: [embed] });
  },
};
