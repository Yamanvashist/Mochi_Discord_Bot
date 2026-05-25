import { SlashCommandBuilder, EmbedBuilder, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get user avatar"),

  async execute(interaction) {
    const user = interaction.user;
    const embed = new EmbedBuilder()
      .setTitle(`${user.username}'s Avatar`)
      .setColor(Colors.Blurple)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 512 }));

    await interaction.reply({ embeds: [embed] });
  }
};