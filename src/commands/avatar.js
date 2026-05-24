import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Get user avatar"),

  async execute(interaction) {
    const user = interaction.user;
    await interaction.reply(user.displayAvatarURL({ dynamic: true }));
  }
};