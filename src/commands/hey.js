import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("hey")
    .setDescription("replies with wassup!"),

  async execute(interaction) {
    await interaction.reply("wassup bro!");
  },
};
