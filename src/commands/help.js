import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows all available commands"),

  async execute(interaction) {

    const embed = new EmbedBuilder()
      .setTitle("Coding Bot Commands ")
      .setDescription("Here are all available commands")
      .addFields(
        { name: "/ping", value: "Checks if bot is online" },
        { name: "/hey", value: "Greets you" },
        { name: "/help", value: "Shows all commands" },

        { name: "/avatar", value: "Shows your profile picture" },
        { name: "/userinfo", value: "Shows user info" },

        { name: "/clear", value: "Deletes messages (1-50)" }
      )
      .setFooter({ text: "Coding Bot • Keep it clean" })
      .setTimestamp();

    await interaction.reply({
      embeds: [embed]
    });

  }
};