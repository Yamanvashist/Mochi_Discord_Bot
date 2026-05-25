import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Bot uptime"),

  async execute(interaction) {
    const uptime = process.uptime();

    const embed = new EmbedBuilder()
      .setTitle("Bot Uptime")
      .setDescription(`Uptime: ${Math.floor(uptime)}s`)
      .setColor(Colors.Blue);

    await interaction.reply({ embeds: [embed] });
  }
};