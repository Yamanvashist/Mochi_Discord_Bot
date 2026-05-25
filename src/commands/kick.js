import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Colors } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption(opt => opt.setName("user").setDescription("User to kick").setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const member = await interaction.guild.members.fetch(user.id);

    await member.kick();

    const embed = new EmbedBuilder()
      .setTitle("User Kicked")
      .setDescription(`${user.username} has been kicked.`)
      .setColor(Colors.Red);

    await interaction.reply({ embeds: [embed] });
  }
};