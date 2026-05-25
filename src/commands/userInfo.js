import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get user info"),

  async execute(interaction) {
    const user = interaction.user;

    const embed = new EmbedBuilder()
      .setTitle("User Info")
      .setColor(Colors.Green)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: "Name", value: user.username, inline: true },
        { name: "ID", value: user.id, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  }
};