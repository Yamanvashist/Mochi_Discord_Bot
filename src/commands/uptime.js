import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Bot uptime"),

  async execute(interaction) {
    const uptime = process.uptime();

    await interaction.reply(`Uptime: ${Math.floor(uptime)}s`);
  }
};