import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Pong 🏓")
      .setDescription("Latency checked and all systems go.")
      .setColor(Colors.Green);

    await interaction.reply({ embeds: [embed] });
  }
};
