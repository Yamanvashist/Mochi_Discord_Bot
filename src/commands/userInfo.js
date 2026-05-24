import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get user info"),

  async execute(interaction) {
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle("User Info")
      .addFields(
        { name: "Name", value: user.username },
        { name: "ID", value: user.id }
      );

    await interaction.reply({ embeds: [embed] });
  }
};