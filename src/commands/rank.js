import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";
import User from "../models/User.js";

export default {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Show your XP and level"),

  async execute(interaction) {
    const userId = interaction.user.id;

    const user = await User.findOne({ userId });

    if (!user) {
      return interaction.reply({
        content: "No data found yet. Start chatting first..",
        ephemeral: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Rank`)
      .setColor(Colors.Blue)
      .addFields(
        { name: "XP", value: `${user.xp}`, inline: true },
        { name: "Level", value: `${user.level}`, inline: true },
        {
          name: "Last Active",
          value: `<t:${Math.floor(user.lastActive / 1000)}:R>`,
          inline: false,
        }
      )
      .setFooter({ text: "Keep earning XP!" });

    await interaction.reply({ embeds: [embed] });
  },
};