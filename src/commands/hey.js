import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("hey")
    .setDescription("replies with wassup!"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("Hey there!")
      .setDescription("wassup bro! 😎")
      .setColor(Colors.Blurple);

    await interaction.reply({ embeds: [embed] });
  },
};
